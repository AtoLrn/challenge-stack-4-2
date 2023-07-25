import { DataTypes } from "sequelize";

export const Tag = (sequelize) => {
    return sequelize.define("tags", {
        name: DataTypes.STRING,
        description: DataTypes.STRING,
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "users",
                key: "id",
            },
        },
        isDeleted: DataTypes.BOOLEAN
    });
};
