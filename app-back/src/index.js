import express, { Router } from "express";
import cors from "cors";
import { config } from "./env.js";
import { userService } from "./services/user.js";
import { encryptPassword } from "./utils/auth.js";

import { register, requestTiming } from "./monitoring/index.js";

import { eventRouter, checkIfCorsAllowed } from "./routes/events/event.js";
import { authRouter } from "./routes/auth.js";
import { userRouter } from "./routes/user.js";
import { tagRouter } from "./routes/tag.js";

import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const PORT = config.port || 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const app = express();

const apiRouter = new Router();

// middlewares
// app.use(cors());
app.use(express.json());



app.use(express.static(__dirname + "../public"));

app.get("^!/api*", function (request, response) {
    try {
        if (fs.lstatSync(path.resolve(__dirname, "../public/", `./${request.path}`)).isFile()) {
            response.sendFile(path.resolve(__dirname, "../public", `./${request.path}`));
        } else {
            response.sendFile(path.resolve(__dirname, "../public/index.html"));
        }
    } catch {
        response.sendFile(path.resolve(__dirname, "../public/index.html"));
    }

});

app.use("/api", apiRouter);

apiRouter.get("/metrics", async (_, res) => {
    console.log("QUERIED");

    res.setHeader("Content-Type", register.contentType);
    res.end(await register.metrics());

    requestTiming.reset();
});

apiRouter.use("/auth", authRouter);
apiRouter.use("/user", userRouter);
apiRouter.use("/tag", tagRouter);

apiRouter.use("/event", cors(checkIfCorsAllowed), eventRouter);

// Create default admin
const admin = await userService.findBy({
    role: 1,
});

if (!admin) {
    console.log("No admin account existing, creating one...");
    try {
        const password = await encryptPassword(config.adminPassword);
        await userService.create({
            firstname: "admin",
            lastname: "admin",
            email: "admin@admin.fr",
            password: password,
            isVerified: true,
            societyName: "admin",
            websiteUrl: "admin.fr",
            kbisFileUrl: "admin",
            role: 1,
            dashboardOptions: JSON.stringify({}),
        });

        console.log("Admin account created");
    } catch (error) {
        console.log(error);
    }
} else {
    console.log(`Admin account already existing with email ${admin.email}, no need to create one.`);
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
