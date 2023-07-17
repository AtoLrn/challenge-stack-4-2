import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { config } from "../env.js";

export async function checkPassword(password, toCheck) {
    return bcrypt.compare(password, toCheck);
}

export function generateToken(user) {
    return jwt.sign({ userId: user.id }, config.jwt_secret, {
        expiresIn: "1y",
    });
}

export function verifyToken(token) {
    return jwt.verify(token, config.jwt_secret);
}

export async function encryptPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
}
