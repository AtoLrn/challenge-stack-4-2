import { postgres } from "./database"

postgres.sync({ force: true }).then(() => {
    console.log("Database synchronized");
    postgres.close();
})
