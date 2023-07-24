
export class Logging {
    static API_URL = import.meta.env.VITE_API_URL

    constructor() { }

    static pusblish(events) {
        console.log(JSON.stringify(events, null, 4))

        var body = new Blob([JSON.stringify(events)], { type: "application/json", withCredentials: true });

        navigator.sendBeacon(Logging.API_URL, body)
        // fetch(Logging.API_URL, {
        //     body: events,
        //     method: 'POST',
        //     keepalive: true 
        // }).catch(err => {
        //     console.log(err)
        // })
    }
}