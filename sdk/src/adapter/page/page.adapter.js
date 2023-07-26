export class PageAdapter {
    constructor() {}

    toJSON() {
        const windowUrl = window.location.pathname
        const queryParams = new URLSearchParams(window.location.search)

        return {
            path: windowUrl,
            title: document.title,
            queryParams: Array.from(queryParams).reduce((acc, [ key, value ]) => {
                acc[key] = value
                return acc
            }, {}),
            window: {
                height: window.innerHeight,
                width: window.innerWidth
            }
        }
    }
}