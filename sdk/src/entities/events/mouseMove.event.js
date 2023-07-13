import { Event } from "./event";

export class MouseEvent extends Event {
    #x
    #y
    constructor(x, y, tag) {
        super('mouse-movement', tag)

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