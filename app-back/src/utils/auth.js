const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

dotenv.config();

async function checkPassword(password, toCheck) {
    return bcrypt.compare(password, toCheck);
}

function generateToken(user) {
    return jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "1y",
    });
}

async function encryptPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}

module.exports = {
    checkPassword,
    generateToken,
    encryptPassword
}
