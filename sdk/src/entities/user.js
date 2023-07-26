import { v4 as uuid } from 'uuid'

export class User {
    #id
    #firstVisit
    #lastVisit
    
    constructor(id, firstVisit, lastVisit) {
        if (id) {
            this.#id = id
        } else {
            this.#id = uuid()
        }

        if (firstVisit !== undefined) {
            this.#firstVisit = firstVisit
        } else {
            this.#firstVisit = new Date()
        }

        if (lastVisit !== undefined) {
            this.#lastVisit = lastVisit
        } else {
            this.#lastVisit = new Date()
        }

    }

    get id() {
        return this.#id
    }

    toJSON() {
        return {
            id: this.#id,
            lastVisit: this.#lastVisit.getTime(),
            firstVisit: this.#firstVisit.getTime()
        }
    }

    /**
     * Turn a bundle fetched values to en entity
     * @param {{ id: string, lastVisit: string, firstVisit: string}} ad
     * @returns {User} return a new instance of user
     */
    static toEntities({ id, lastVisit, firstVisit}) {
        return new User(id, new Date(lastVisit), new Date(firstVisit))
    }
}