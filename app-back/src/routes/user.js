import { Router } from "express";
import { userService } from "../services/user.js";
import { checkAuth } from "../middlewares/checkAuth.js";
import { config } from "../env.js";

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

        if (!user) {
            return res.status(401).send({ error: "No user with this id" });
        }

        const updatedUser = await userService.update(
            {
                id: req.params.id,
            },
            { isVerified: true }
        )

        const mail = {
            from: config.gmail.user,
            to: user.email,
            subject: "Account verified !",
            text: "Your account has been successfully verified ! You can now use the analytics tool."
        };

        config.gmail.transporter.sendMail(mail, (error) => {
            if(error) {
                throw error
            }
        })

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