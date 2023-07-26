import { it, expect } from 'vitest'
import { User } from '../../src/entities/user'

const defaultUser = {
    id: 'default-id',
    lastVisit: new Date(),
    firstVisit: new Date()
}

    it('Creation of an unkonwn user', () => {

        const user = new User(
            defaultUser.id,
            defaultUser.firstVisit,
            defaultUser.lastVisit
            )
        

        expect(user.toJSON().lastVisit).toEqual(defaultUser.lastVisit.getTime())
    })

    it('Creation of a user from object', () => {
        const user = User.toEntities(defaultUser)

        expect(user.id).toEqual(defaultUser.id)
    })
