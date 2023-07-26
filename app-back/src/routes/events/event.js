import { userService } from "../../services/user.js";
import { checkAuth } from "../../middlewares/checkAuth.js";

import { Router } from "express";
import { isEventSchema } from "./dto.js";

import { EventModel } from "./../../database/models/Events.js";

import { Subject } from "rxjs";

import UAParser from "ua-parser-js";

export const eventRouter = Router();

const eventSubject = new Subject();

export const checkIfCorsAllowed = async (req, callback) => {
    callback(null, { origin: true, credentials: true });
    return;

    if (!req.get("origin")) {
        callback(null, { origin: false });
        return;
    }

    const requestOrigin = new URL(req.get("origin"));

    if (!requestOrigin) {
        callback(null, { origin: false });
        return;
    }

    const user = await userService.findBy({
        websiteUrl: requestOrigin.hostname,
    });

    if (!user) {
        callback(null, { origin: false });
        return;
    }

    callback(null, { origin: true, credentials: true });
};

eventRouter.post("", async (req, res) => {
    if (!isEventSchema(req.body)) {
        console.log("Received wrong formatted JSON", JSON.stringify(req.body, null, 4));
        res.sendStatus(400);
        return false;
    }

    const parser = new UAParser(req.body.device.ua);
    const uaParsedInfo = {
        browser: {
            name: parser.getBrowser().name ?? "unkonwn",
        },
        os: parser.getOS().name ?? "unkonwn",
        kind: parser.getDevice().type ?? "unkonwn",
    };

    req.body.device = {
        ...req.body.device,
        ...uaParsedInfo,
    };

    const event = req.body;

    EventModel.create(event);

    eventSubject.next(event);

    res.sendStatus(200);
});

eventRouter.get("/stream", async (req, res) => {
    res.writeHead(200, {
        Connection: "keep-alive",
        "Cache-Control": "no-cache",
        "Content-Type": "text/event-stream",
    });

    const subscription = eventSubject.subscribe((data) => {
        res.write(`data: ${JSON.stringify(data)}\n\n`);
    });

    res.on("close", () => {
        subscription.unsubscribe();
    });
});

eventRouter.get("/", checkAuth(false), async (req, res) => {
    try {
        const { dimension, startDate, endDate } = req.body;

        const aggregationPipeline = [];

        dimension.forEach((filter) => {
            switch (filter.type) {
                case "path":
                    aggregationPipeline.push({
                        $match: {
                            "page.path": filter.value,
                        },
                    });
                    break;
                case "device":
                    aggregationPipeline.push({
                        $match: {
                            "device.ua": filter.value,
                        },
                    });
                    break;
                case "tag":
                    aggregationPipeline.push(
                        {
                            $addFields: {
                                events: {
                                    $filter: {
                                        input: "$events",
                                        as: "event",
                                        cond: { $eq: ["$$event.tag", filter.value] },
                                    },
                                },
                            },
                        },
                        {
                            $match: {
                                events: { $ne: [] },
                            },
                        }
                    );
                    break;
                default:
                    break;
            }
        });

        const events = await EventModel.aggregate(aggregationPipeline);

        return res.status(200).send(events);
    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: error });
    }
});

eventRouter.get("/tunnel/:tag", checkAuth(false), async (req, res) => {
    try {
        const aggregationPipeline = [
            { $unwind: "$events" },
            {
                $match: {
                    "events.kind": {
                        $not: { $eq: "mouse-movement" },
                    },
                    appId: req.user.appId,
                },
            },
            {
                $group: {
                    _id: "$sessionId",
                    events: { $push: "$events" },
                },
            },
            {
                $match: {
                    _id: { $not: { $eq: null } },
                },
            },
            { $sort: { "events.time": 1 } },
        ];

        const results = await EventModel.aggregate(aggregationPipeline);

        const filteredResults = results.map((res) => {
            const eventsAfterTag = res.events.reduce(
                (acc, val) => {
                    if (val.tag === req.params.tag && !acc.found) {
                        acc.found = true;
                        acc.events = [val];
                    }

                    if (acc.found) {
                        const alreadyInArray = acc.events.find(
                            (event) => event.kind === val.kind && event.tag === val.tag
                        );

                        if (!alreadyInArray) {
                            acc.events.push(val);
                        }
                    }

                    return acc;
                },
                { found: false, events: [] }
            ).events;

            const newValues = { ...res, events: eventsAfterTag };

            return newValues;
        });

        const willCreateCycle = (arr, target, baseTarget) => {
            if (baseTarget === target) {
                return true;
            }

            const destination = arr.find((elem) => elem[1] === target);

            if (!destination) {
                return false;
            }

            return willCreateCycle(arr, destination[1], baseTarget ?? target);
        };

        const sankeyFormat = filteredResults.reduce(
            (acc, val) => {
                val.events.forEach((event, index, arr) => {
                    const nextEvent = arr[index + 1];

                    if (nextEvent) {
                        const formattedEventName = `${event.kind} | ${(event.kind ? event.tag : event.path)  ?? "Not tagged"}`;
                        const formattedNextName = `${nextEvent.kind} | ${(nextEvent.kind ? nextEvent.tag : nextEvent.path) ?? "Not tagged"}`;

                        const weigths = acc.find(
                            (weigth) => weigth[0] === formattedEventName && weigth[1] === formattedNextName
                        );

                        if (!willCreateCycle(acc, formattedNextName)) {
                            if (weigths) {
                                weigths[2]++;
                            } else {
                                acc.push([formattedEventName, formattedNextName, 1]);
                            }
                        }
                    }
                });

                return acc;
            },
            [["From", "To", "Weight"]]
        );

        return res.status(200).send({ data: sankeyFormat });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: error });
    }
});
