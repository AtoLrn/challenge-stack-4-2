const { Model, DataTypes } = require("sequelize");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

dotenv.config();

module.exports = (sequelize) => {
    const User = sequelize.define("users",
        {
            firstname: DataTypes.STRING,
            lastname: DataTypes.STRING,
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
            },
            societyName: DataTypes.STRING,
            kbisFileUrl: DataTypes.STRING,
            websiteUrl: DataTypes.STRING,
            isVerified: DataTypes.BOOLEAN,
        },
    );

    return User
};
