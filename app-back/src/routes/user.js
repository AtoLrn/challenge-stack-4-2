import { Router } from "express";
import { userService } from "../services/user.js";
import { checkAuth } from "../middlewares/checkAuth.js";

const userRouter = Router();

userRouter.get("/", checkAuth(true), async (_, res) => {
    try {
        const users = await userService.findAll();

        return res.status(200).send({
            data: users,
        });
    } catch (error) {
        return res.status(400).send({ error: error });
    }
});

userRouter.post("/verify/:id", checkAuth(true), async (req, res) => {
    try {
        const user = await userService.findBy({
            id: req.params.id,
        });

        const updatedUser = await userService.update(
            {
                id: req.params.id,
            },
            { isVerified: true }
        );

        return res.status(200).send({
            msg: `user ${user.id} Successfully verified`,
            data: updatedUser,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: error });
    }
});

export default userRouter;
