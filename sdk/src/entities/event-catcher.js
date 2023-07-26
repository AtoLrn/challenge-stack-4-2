import { UserLocalStorageAdapter } from "../adapter/user/user.adapter"
import { User } from "./user"
import { ClickEvent } from "./events/click.event"
import { Logging } from "../adapter/logging/logging.adapter"
import { DeviceAdapter } from "../adapter/device/device.adapter"
import { PageLeaveEvent } from "./events/pageLeave.event"
import { NavigateEvent } from "./events/NavigateLeave.event"
import { PageViewEvent } from "./events/pageView.event"
import { MouseEvent } from "./events/mouseMove.event"
import { PageAdapter } from "../adapter/page/page.adapter"
import { SubmitEvent } from "./events/submit.event"

import { v4 as uuid } from 'uuid'

export class EventCatcher {
    #secToMinFactor = 60000
    #events = []
    #user
    #device
    #page
    #sessionId

    #lastTimeout
    #appId

    constructor(appId) {
        this.#sessionId = uuid()
        this.#appId = appId
        this.#user = this.#getUser()
        this.#page = new PageAdapter()
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

        document.addEventListener('mousemove', (event) => {
            const newEvent = new MouseEvent(event.clientX, event.clientY, event.target.getAttribute('sdk-id'))

            this.#stackEvent(newEvent)
        })

        window.onbeforeunload = () => {
            const newEvent = new PageLeaveEvent()

            this.#stackEvent(newEvent)
            this.#sendEvents()
        };

        const pushState = history.pushState;
        const that = this
        history.pushState = function (path) {
            pushState.apply(history, arguments);

            that.#stackEvent(new NavigateEvent(path.current))
            that.#stackEvent(new PageLeaveEvent())
            that.#sendEvents()

            that.#events = []
            that.#stackEvent(new PageViewEvent())
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
        if (this.#lastTimeout) {
            clearTimeout(this.#lastTimeout)
        }

        this.#lastTimeout = setTimeout(() => {
            const newEvent = new PageLeaveEvent()

            this.#stackEvent(newEvent)
            this.#sendEvents()
        }, 15 * this.#secToMinFactor)

        this.#events.push(triggerEvent)
    }

    #sendEvents() {
        Logging.pusblish(this.#buildRequest())
    }

    #buildRequest() {
        return {
            appId: this.#appId,
            sessionId: this.#sessionId,
            user: this.#user,
            page: this.#page,
            device: this.#device,
            events: this.#events
        }
    }
}