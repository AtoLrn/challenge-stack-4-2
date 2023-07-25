import { userService } from "../../services/user.js";
import { checkAuth } from "../../middlewares/checkAuth.js";

import { Router } from "express";
import { isEventSchema } from "./dto.js";

import { EventModel } from "./../../database/models/Events.js";

import { Subject } from "rxjs";

export const eventRouter = Router();

const eventSubject = new Subject();

export const checkIfCorsAllowed = async (req, callback) => {
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

    req.appId = user.appId;

    callback(null, { origin: true, credentials: true });
};

eventRouter.post("", async (req, res) => {
    if (!isEventSchema(req.body)) {
        console.log("Received wrong formatted JSON", JSON.stringify(req.body, null, 4));
        res.sendStatus(400);
        return false;
    }

    const event = { ...req.body, appId: req.appId };

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
