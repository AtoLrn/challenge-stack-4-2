import { UserLocalStorageAdapter } from "../adapter/user/user.adapter"
import { User } from "./user"
import { ClickEvent } from "./events/click.event"
import { Logging } from "../adapter/logging/logging.adapter"
import { DeviceAdapter } from "../adapter/device/device.adapter"
import { PageLeaveEvent } from "./events/pageLeave.event"
import { PageViewEvent } from "./events/pageView.event"

export class EventCatcher {
    #events = []
    #user
    #device

    constructor() {
        this.#user = this.#getUser()
        this.#device = DeviceAdapter.getDeviceInfo()

        const newEvent = new PageViewEvent()

        this.#stackEvent(newEvent)
        
        document.addEventListener('click', (event) => {
            const newEvent = new ClickEvent(event.clientX, event.clientY, event.target.getAttribute('sdk-id'))

            this.#stackEvent(newEvent)
        })

        document.addEventListener('submit', (event) => {
            const newEvent = new SubmitEvent(event.target.getAttribute('sdk-id'))

            this.#stackEvent(newEvent)
        })

        window.onbeforeunload = () => {
            const newEvent = new PageLeaveEvent()

            this.#stackEvent(newEvent)
            this.#sendEvents()
        };
    }

    #getUser() {
        const user = UserLocalStorageAdapter.getUser()

        if (user) { 
            return user 
        }

        const newUser = new User()

        UserLocalStorageAdapter.saveUser(newUser)

        return newUser
    }

    #stackEvent(triggerEvent) {
        this.#events.push(triggerEvent)
    }

    #sendEvents() {
        Logging.pusblish(this.#buildRequest())
    }

    #buildRequest() {
        return {
            user: this.#user,
            device: this.#device,
            event: this.#events
        }
    }
}