export class Event {
    constructor(eventType, tag) {
        this.eventType = eventType
        this.tag = tag
        this.triggerTime = new Date()
    }

    toJSON() {
        return {
            kind: this.eventType,
            tag: this.tag?? undefined,
            time: this.triggerTime.getTime()
        }
    }
}