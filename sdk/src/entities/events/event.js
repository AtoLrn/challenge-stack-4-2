export class Event {
    constructor(eventType, tags) {
        this.eventType = eventType
        this.tags = tags
        this.triggerTime = new Date()
    }

    toJSON() {
        return {
            kind: this.eventType,
            tags: this.tags?? [],
            time: this.triggerTime.getTime()
        }
    }
}