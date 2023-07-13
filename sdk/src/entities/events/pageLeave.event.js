import { Event } from "./event";

export class PageLeaveEvent extends Event {

    constructor(tag) {
        super('page-leave', tag)
    }
}