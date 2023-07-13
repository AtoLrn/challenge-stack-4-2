const mongoose = require("mongoose");
const Sequelize = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

const { MONGO_URL, POSTGRE_HOST, POSTGRE_USER, POSTGRE_PASSWORD, POSTGRE_DATABASE } = process.env;

mongoose.connect(MONGO_URL);
const mongo = mongoose.connection;

mongo.once("open", () => {
    console.log("Mongo database is connected");
});

const sequelize = new Sequelize(POSTGRE_DATABASE, POSTGRE_USER, POSTGRE_PASSWORD, {
    host: POSTGRE_HOST,
    dialect: "postgres",
});

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

databases.User = require('./models/User') (sequelize)

module.exports = databases;
