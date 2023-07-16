import express from "express";
import cors from "cors";
import { config } from "./env.js";

import authRouter from "./routes/auth.js";

const PORT = config.port || 3000;

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
    res.send("Hello world");
});

app.use("/auth", authRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
