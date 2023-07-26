import { Router } from "express";
import { tagService } from "../services/tag.js";
import crypto from "crypto";
import { checkAuth } from "../middlewares/checkAuth.js";

export const tagRouter = Router();

tagRouter.get("/", checkAuth(false), async (req, res) => {
    try {
        const tags = await tagService.findAll({
            userId: req.user.id,
        });

        return res.status(200).send({
            data: tags,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: error });
    }
});

tagRouter.post("/", checkAuth(false), async (req, res) => {
    try {
        const { description } = req.body;
        const name = crypto.randomBytes(5).toString("hex");

        const tag = await tagService.create({
            name,
            description,
            userId: req.user.id,
            isDeleted: false,
        });

        return res.status(200).send({
            msg: "Votre tag a été crée",
            data: tag,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: error });
    }
});

tagRouter.put("/:id", checkAuth(false), async (req, res) => {
    try {
        const tag = await tagService.findBy({
            id: req.params.id,
        });

        if (!tag) return res.status(404).send({ error: "this tag does not exist" });

        if (req.user.id != tag.userId && req.user.role != 1) {
            return res.status(403).send({ error: "Higher privileges needed" });
        }

        const { description } = req.body;

        const updatedTag = await tagService.update(
            {
                id: req.params.id,
            },
            { description }
        );

        return res.status(200).send({
            msg: "Tag modifiés !",
            data: updatedTag,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: error });
    }
});

tagRouter.delete("/:id", checkAuth(false), async (req, res) => {
    try {
        const tag = await tagService.findBy({
            id: req.params.id,
        });

        if (!tag) return res.status(404).send({ error: "This tag does not exist" });

        if (req.user.id != tag.userId && req.user.role != 1) {
            return res.status(403).send({ error: "Higher privileges needed" });
        }

        await tagService.update(
            {
                id: req.params.id,
            },
            { isDeleted: true }
        );

        return res.status(200).send({
            msg: "Votre tag a été supprimé.",
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: error });
    }
});
