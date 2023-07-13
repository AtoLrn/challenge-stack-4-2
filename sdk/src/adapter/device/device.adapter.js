export class DeviceAdapter {
    constructor() {}

    static getDeviceInfo() {
        return {
            ua: navigator.userAgent,
            connection: navigator.connection ? {
                speed: navigator.connection.downlink,
                type: navigator.connection.type
            } : undefined,
        }
    }
}