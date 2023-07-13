
export class Logging {
    static API_URL = import.meta.env.VITE_API_URL

    constructor() { }

    static pusblish(events) {
        console.log(JSON.stringify(events, null, 4))
        fetch(Logging.API_URL, {
            body: events,
            method: 'POST'
        })
    }
}