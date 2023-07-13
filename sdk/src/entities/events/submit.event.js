import { Event } from "./event";

export class SubmitEvent extends Event {
    constructor(tag) {
        super('submit', tag)
    }
}