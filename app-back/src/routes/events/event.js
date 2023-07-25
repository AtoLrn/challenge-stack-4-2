import { userService } from "../../services/user.js";

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

    callback(null, { origin: true, credentials: true });
};

eventRouter.post("", async (req, res) => {
    if (!isEventSchema(req.body)) {
        console.log("Received wrong formatted JSON", JSON.stringify(req.body, null, 4));
        res.sendStatus(400);
        return false;
    }

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
