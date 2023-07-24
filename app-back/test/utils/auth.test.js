import jwt from "jsonwebtoken";
import { checkPassword, generateToken, verifyToken, encryptPassword } from "../../src/utils/auth.js";

describe("Auth utils functions", () => {
    const testPassword = "password";
    let testHashedPassword;
    let testToken;

    beforeAll(async () => {
        testHashedPassword = await encryptPassword(testPassword);
        testToken = generateToken(1);
    });

    describe("test password", () => {
        it("should return true for valid password", async () => {
            const isValid = await checkPassword(testPassword, testHashedPassword);
            expect(isValid).toBe(true);
        });

        it("should return false for wrong password", async () => {
            const isValid = await checkPassword("passw0rd", testHashedPassword);
            expect(isValid).toBe(false);
        });

        it("should return hashed password", async () => {
            const hashedPassword = await encryptPassword(testPassword);
            expect(hashedPassword).toBeDefined();
            expect(hashedPassword).not.toBe(testPassword);
        });
    });

    describe("test token", () => {
        it("should decode a valid token", () => {
            const decodedToken = verifyToken(testToken);
            expect(decodedToken.userId).toBe(1);
        });

        it("should fail for wrong token", () => {
            const invalidToken = jwt.sign({ userId: 1 }, "different_secret", {
                expiresIn: "1y",
            });

            expect(() => {
                verifyToken(invalidToken);
            }).toThrow(jwt.JsonWebTokenError);
        });
    });
});
