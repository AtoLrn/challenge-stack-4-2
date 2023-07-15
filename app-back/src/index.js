const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
    res.send("Hello world");
});

app.use("/auth", require("./routes/auth"))

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
