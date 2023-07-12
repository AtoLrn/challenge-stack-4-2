import { Model, DataTypes } from "sequelize";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

module.exports = function (connection) {
    class User extends Model {
        async checkPassword(password) {
            return bcrypt.compare(password, this.password);
        }

        generateToken() {
            return jwt.sign({ id: this.id }, process.env.JWT_SECRET, {
                expiresIn: "1y",
            });
        }
    }

    User.init(
        {
            lastname: DataTypes.STRING,
            firstname: DataTypes.STRING,
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
                validate: {
                    isEmail: true,
                    isNotNull: function (value) {
                        if (value === null) {
                            throw new Error("Email can't be empty");
                        }
                    },
                },
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    min: 8,
                    //is: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
                },
            },
        },
        {
            sequelize: connection,
            tableName: "users",
        }
    );

    async function encryptPassword(user, options) {
        if (!options?.fields.includes("password")) {
            return;
        }
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(user.password, salt);
        user.password = hash;
    }

    User.addHook("beforeCreate", encryptPassword);
    User.addHook("beforeUpdate", encryptPassword);

    return User;
};
