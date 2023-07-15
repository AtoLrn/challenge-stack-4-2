const { User } = require("../database/index");
console.log(User)

module.exports = {
    findBy: async function (criteria, option = {}) {
        return User.findOne({
            where: criteria,
            ...option
        })
    },
    create: async function (data) {
        try {
            return await User.create(data);
        } catch (e) {
            throw e;
        }
  },
}
