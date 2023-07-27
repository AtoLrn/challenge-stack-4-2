export class DeviceAdapter {
    constructor() {}

    static getDeviceInfo() {
        return {
            ua: navigator.userAgent,
            connection: navigator.connection ? {
                speed: navigator.connection.downlink,
                kind: navigator.connection.type
            } : undefined,
        }
    }
}