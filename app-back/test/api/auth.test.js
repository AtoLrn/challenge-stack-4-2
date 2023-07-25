import { jest } from '@jest/globals';
import { app } from "../../src/index.js";
import request from "supertest";

//jest.mock("bcryptjs", () => ({
    //hash: jest.fn().mockReturnValue("hashed_password"),
//}));

//jest.mock("uuid", () => ({
    //v4: jest.fn().mockReturnValue("random_uuid"),
//}));

//jest.mock("nodemailer", () => ({
    //createTransport: jest.fn().mockReturnValue({
        //sendMail: jest.fn().mockImplementation((mailOptions, callback) => {
            //callback(null);
        //}),
    //}),
//}));
//
const testUser = {
    firstname: "test",
    lastname: "test",
    email: "test@gmail.com",
    password: "password",
    societyName: "test",
    websiteUrl: "test"
}

describe("test auth routes", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should return 404 if email already taken", async () => {
        const response = await request(app)
            .post("/api/auth/register")
            .send({ email: "admin@admin.fr" })
            .set("Content-Type", "application/json")
            .expect(409);

        expect(response.body.error).toBe("Email déjà prit");
    });

    it("should return 400 if no file", async () => {
        const response = await request(app)
            .post("/api/auth/register")
            .send(testUser)
            .expect(400);

        expect(response.body.error).toBe("Un fichier est nécessaire pour les kbis");
    });

    it("should return 400 if file not pdf", async () => {
        const response = await request(app)
            .post("/api/auth/register")
            .field("email", "test@gmail.com")
            .attach("kbisFile", `./test/api/fileText.txt`)
            .expect(400);

        expect(response.body.error).toBe("Le fichier doit être pdf");
    });
});
