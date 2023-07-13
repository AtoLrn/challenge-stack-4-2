import { Event } from "./event";

export class ClickEvent extends Event {
    #x
    #y
    constructor(x, y, tag) {
        super('click', tag)

        this.#x = x
        this.#y = y
    }

    toJSON() {
        return {
            ...super.toJSON(),
            x: this.#x,
            y: this.#y
        }
    }
}