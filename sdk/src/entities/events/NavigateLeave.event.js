import { Event } from "./event";

export class NavigateEvent extends Event {
    #path
    
    constructor(path, tag) {
        super('navigate', tag)
        this.#path = path
    }

    toJSON () {
        return {
            ...super.toJSON(),
            path: this.#path
        }
    }
}