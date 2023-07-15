const { sequelize } = require("./database");
const mongoose = require("mongoose");

async function runMigrations() {
    try {
        await sequelize.sync({ force: true });
        console.log("Database synchronized");
        sequelize.close();
    } catch (error) {
        console.error("An error occurred during database synchronization:", error);
    } finally {
        mongoose.disconnect();
    }
}

runMigrations();
