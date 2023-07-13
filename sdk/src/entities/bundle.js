export class Bundle {
    #data 
    #lastUpdate
    #key

    constructor({ data, lastUpdate }, key) {
        this.#data = data
        this.#lastUpdate = lastUpdate
        this.#key = key

        this.#save()
    }


    #save() {
        localStorage.setItem(this.#key, JSON.stringify(this))
    }

    set data(data) {
        this.#data = data
        this.#lastUpdate = new Date()
        this.#save()
    }

    get data() {
        return this.#data
    }

    toJSON() {
        return {
            data: this.#data,
            lastUpdate: this.#lastUpdate
        }
    }

    static toEntities(data, key) {
        return new Bundle(data, key)
    }
}