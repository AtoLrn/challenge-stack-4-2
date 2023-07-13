import { Event } from "./event";

export class PageViewEvent extends Event {

    constructor(tag) {
        super('page-view', tag)
    }
}