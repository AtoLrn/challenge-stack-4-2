import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import databases from "./database/index.js";

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
    res.send("Hello world");
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
