import databases from "./database/index.js";
import mongoose from "mongoose";

async function runMigrations() {
    try {
        await databases.sequelize.sync({ force: true });
        console.log("Database synchronized");
        databases.sequelize.close();
    } catch (error) {
        console.error("An error occurred during database synchronization:", error);
    } finally {
        mongoose.disconnect();
    }
}

runMigrations();
