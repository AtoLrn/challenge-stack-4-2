import { DataTypes } from "sequelize";

const User = (sequelize) => {
    return sequelize.define("users", {
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
    });
};

export default User;
