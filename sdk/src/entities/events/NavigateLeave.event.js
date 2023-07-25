import { Event } from "./event";

export class NavigateEvent extends Event {
    #path
    
    constructor(path, tag) {
        this.#path = path
        super('navigate', tag)
    }

    toJSON () {
        return {
            ...super.toJSON(),
            path: this.#path
        }
    }
}