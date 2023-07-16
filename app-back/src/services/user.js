import databases from "../database/index.js";

const User = databases.User;

class Userservice {
    constructor(userModel) {
        this.User = userModel;
    }

    async findBy(criteria, option = {}) {
        return this.User.findOne({
            where: criteria,
            ...option,
        });
    }

    async create(data) {
        try {
            return await this.User.create(data);
        } catch (e) {
            throw e;
        }
    }
}

export const userService = new Userservice(User);
