import express from "express";
import cors from "cors";
import { config } from "./env.js";
import { userService } from "./services/user.js";
import { encryptPassword } from "./utils/auth.js";

import { register, requestTiming } from "./monitoring/index.js";

import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";

const PORT = config.port || 3000;

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
    const end = requestTiming.labels({ path: "test" }).startTimer();

    res.send("Hello world");

    end();
});

app.get("/metrics", async (_, res) => {
    console.log("QUERIED");

    res.setHeader("Content-Type", register.contentType);
    res.end(await register.metrics());

    requestTiming.reset();
});

app.use("/auth", authRouter);
app.use("/user", userRouter);

// Create default admin
const admin = await userService.findBy({
    role: 1,
});

if (!admin) {
    console.log("No admin account existing, creating one...");
    try {
        console.log(config.adminPassword);
        const password = await encryptPassword(config.adminPassword);
        await userService.create({
            firstname: "admin",
            lastname: "admin",
            email: config.adminEmail,
            password: password,
            isVerified: true,
            societyName: "admin",
            websiteUrl: "admin.fr",
            kbisFileUrl: "admin",
            role: 1,
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
