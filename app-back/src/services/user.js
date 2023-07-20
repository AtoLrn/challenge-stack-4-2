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

    async findAll() {
        return this.User.findAll();
    }

    async create(data) {
        return await this.User.create(data);
    }

    async update(criteria, data) {
        return await this.User.update(data, {
            where: criteria,
            returning: true,
        });
    }

    async delete(criteria) {
        return await this.User.destroy({
            where: criteria,
        })
    }
}

export const userService = new Userservice(User);
