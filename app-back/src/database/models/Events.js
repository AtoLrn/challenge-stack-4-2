import mongoose from "mongoose";

import database from "./../index.js";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

export const EventsSchema = new Schema({
    id: ObjectId,
    appId: ObjectId,
    user: {
        id: String,
        lastVisit: Number,
        firstVisit: Number,
    },
    page: {
        path: String,
        title: String,
        queryParams: Object,
        window: {
            height: Number,
            width: Number,
        },
    },
    device: {
        ua: String,
        connection: {
            speed: Number,
            type: String,
        },
    },
    events: [Object],
});

export const EventModel = database.mongo.model("events", EventsSchema);