import mongoose from "mongoose";
import Sequelize from "sequelize";
import User from "./models/User.js";
import { config } from "../env.js";

mongoose.connect(config.db.mongo_url);
const mongo = mongoose.connection;

mongo.once("open", () => {
    console.log("Mongo database is connected");
});

const sequelize = new Sequelize(
    config.db.postgre_database,
    config.db.postgre_user,
    config.db.postgre_password,
    {
        host: config.postgre_host,
        dialect: "postgres",
    }
);

sequelize
    .authenticate()
    .then(() => {
        console.log("PostgreSQL database is connected");
    })
    .catch((err) => {
        console.log(err);
    });

const databases = {
    mongo,
    sequelize,
};

databases.User = User(sequelize);

export default databases;
