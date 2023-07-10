import { UserLocalStorageAdapter } from "../adapter/user/user.adapter"
import { User } from "./user"
import { Event } from "./events/event"
import { ClickEvent } from "./events/click.event"

export class EventCatcher {
    #events = []
    #user

    constructor() {
        this.#user = this.#getUser()
        
        document.addEventListener('click', (event) => {
            this.#stackEvent(event)
        })

        window.onbeforeunload = () => this.#sendEvents();
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
        const event = new ClickEvent(triggerEvent.clientX, triggerEvent.clientY, triggerEvent.target.getAttribute('sdk-id'))
        this.#events.push(event)
        console.log(JSON.stringify(this.#buildRequest()))
    }

    #sendEvents() {
        console.log(JSON.stringify(this.#events))
        return null
    }

    #buildRequest() {
        return {
            user: this.#user,
            event: this.#events
        }
    }
}