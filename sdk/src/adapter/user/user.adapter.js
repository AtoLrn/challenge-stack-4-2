import { Bundle } from "../../entities/bundle";
import { User } from "../../entities/user";

export class UserLocalStorageAdapter {
    static LOCAL_STORAGE_KEY = 'SDK_USER_KEY'
    
    /**
     * Fetch the User from the localStorage
     * @returns {User | undefined} return a new instance of user
     */
    static getUser() {
        const item = JSON.parse(localStorage.getItem(UserLocalStorageAdapter.LOCAL_STORAGE_KEY))
        console.log(item)
        if (item) {
            const bundle = new Bundle(item, UserLocalStorageAdapter.LOCAL_STORAGE_KEY)

            return User.toEntities(bundle.data)
        }
    }


    static saveUser(user) {
        new Bundle({ data: user, lastUpdate: new Date()}, UserLocalStorageAdapter.LOCAL_STORAGE_KEY)
    }
    
}