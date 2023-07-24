import { app } from "../../src/index.js";
import request from "supertest";
import { userService } from "../../src/services/user.js"

jest.mock("../../src/services/user.js", () => ({
    findBy: jest.fn(),
    create: jest.fn(),
}));

jest.mock("bcryptjs", () => ({
    hash: jest.fn().mockReturnValue("hashed_password"),
}));

jest.mock("uuid", () => ({
    v4: jest.fn().mockReturnValue("random_uuid"),
}));

jest.mock("nodemailer", () => ({
    createTransport: jest.fn().mockReturnValue({
        sendMail: jest.fn().mockImplementation((mailOptions, callback) => {
            callback(null);
        }),
    }),
}));

describe("test auth routes", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("Devrait renvoyer une erreur 400 si l'email est déjà pris", async () => {
        const existingUser = { email: "test@example.com" };
        jest.spyOn(userService, "findBy").mockResolvedValue(existingUser);

        const response = await request(app)
            .post("/register")
            .send({ email: "test@example.com" })
            .set("Content-Type", "application/json")
            .expect(409);

        expect(response.body.error).toBe("Email already taken");
    });
});
