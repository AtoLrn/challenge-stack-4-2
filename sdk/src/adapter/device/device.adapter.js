export class DeviceAdapter {
    constructor() {}

    static getDeviceInfo() {
        const windowUrl = window.location.pathname

        return {
            ua: navigator.userAgent,
            path: windowUrl,
            connection: navigator.connection ? {
                speed: navigator.connection.downlink,
                type: navigator.connection.type
            } : undefined,
            window: {
                height: window.innerHeight,
                width: window.innerWidth
            }
        }
    }
}