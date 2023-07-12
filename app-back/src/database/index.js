import mongoose from "mongoose";
import Sequelize from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const { MONGO_URL, POSTGRE_HOST, POSTGRE_USER, POSTGRE_PASSWORD, POSTGRE_DATABASE } = process.env;

mongoose.connect(MONGO_URL);
const mongo = mongoose.connection;

mongo.once("open", () => {
    console.log("Mongo database is connected");
});

const postgres = new Sequelize(POSTGRE_DATABASE, POSTGRE_USER, POSTGRE_PASSWORD, {
    host: POSTGRE_HOST,
    dialect: "postgres",
});

const databases = {
    mongo,
    postgres,
};

module.exports = databases;
