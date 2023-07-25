import { app } from "../../src/index.js";
import request from "supertest";
import { generateToken } from "../../src/utils/auth.js";

describe("test tag routes", () => {
    let testToken;

    beforeAll(async () => {
        testToken = generateToken(1);
    });

    it("should retreive all user tags", async () => {
        const response = await request(app).get("/tag").set("Authorization", testToken).expect(200);

        expect(response.body.data).toBeDefined();
        expect(Array.isArray(response.body.data)).toBe(true);
    });

    it("should create a tag", async () => {
        const tagData = {
            description: "Tag description",
        };

        const response = await request(app)
            .post("/tag")
            .send(tagData)
            .set("Authorization", testToken)
            .set("Content-Type", "application/json")
            .expect(200);

        expect(response.body.msg).toBe("Tag successfully created");
        expect(response.body.data.name).toBeDefined();
        expect(response.body.data.description).toBe(tagData.description);
    });

    it("should update user tag", async () => {
        const tagData = {
            description: "Tag description",
        };
        const response = await request(app)
            .post("/tag")
            .send(tagData)
            .set("Authorization", testToken)
            .set("Content-Type", "application/json")
            .expect(200);

        const updatedDescription = "new description";

        const updatedResponse = await request(app)
            .put(`/tag/${response.body.data.id}`)
            .set("Authorization", testToken)
            .set("Content-Type", "application/json")
            .send({ description: updatedDescription })
            .expect(200);

        expect(updatedResponse.body.msg).toBe("Tag updated !");
        expect(updatedResponse.body.data).toBeDefined();
        expect(updatedResponse.body.data.id).toBe(response.body.data.id);
        expect(updatedResponse.body.data.description).toBe(updatedDescription);
    });

    it("should delete tag", async () => {
        const tagData = {
            description: "Tag description",
        };
        const response = await request(app)
            .post("/tag")
            .send(tagData)
            .set("Authorization", testToken)
            .set("Content-Type", "application/json")
            .expect(200);

        const deleteResponse = await request(app)
            .delete(`/tag/${response.body.data.id}`)
            .set("Authorization", testToken)
            .expect(200);

        expect(deleteResponse.body.msg).toBe(`Tag ${response.body.data.id} deleted !`);
    });

    it("should refuse if user don't have token", async () => {
        const tagData = {
            description: "Tag description",
        };

        const response = await request(app)
            .post("/tag")
            .send(tagData)
            .set("Content-Type", "application/json")
            .expect(401);

        expect(response.body.error).toBe("Token needed");
    });
});
