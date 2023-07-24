import databases from "../database/index.js";

const Tag = databases.Tag;

class Tagservice {
    constructor(tagModel) {
        this.Tag = tagModel;
    }

    async findBy(criteria, option = {}) {
        return this.Tag.findOne({
            where: criteria,
            ...option,
        });
    }

    async findAll(criteria, option = {}) {
        return this.Tag.findAll({
            where: criteria,
            ...option,
        });
    }

    async create(data) {
        return await this.Tag.create(data);
    }

    async update(criteria, data) {
        const [, tag = []] = await this.Tag.update(data, {
            where: criteria,
            returning: true,
        });
        return tag[0];
    }

    async delete(criteria) {
        return await this.Tag.destroy({
            where: criteria,
        });
    }
}

export const tagService = new Tagservice(Tag);
