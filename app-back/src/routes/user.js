import { Router } from "express";
import { userService } from "../services/user.js";
import { checkAuth } from "../middlewares/checkAuth.js";
import { config } from "../env.js";
import { requestTiming } from "../monitoring/index.js";
import { encryptPassword } from "../utils/auth.js";
import crypto from "crypto";

export const userRouter = Router();

userRouter.get("/", checkAuth(true), async (_, res) => {
    const end = requestTiming.labels({ path: "get_users" }).startTimer();

    try {
        const users = await userService.findAll();

        return res.status(200).send({
            data: users,
        });
    } catch (error) {
        return res.status(400).send({ error: error });
    } finally {
        end();
    }
});

userRouter.put("/verify/:id", checkAuth(true), async (req, res) => {
    try {
        const user = await userService.findBy({
            id: req.params.id,
        });

        if (!user) {
            return res.status(401).send({ error: "No user with this id" });
        }

        await userService.update(
            {
                id: req.params.id,
            },
            { isVerified: true }
        );

        const mail = {
            from: config.gmail.user,
            to: user.email,
            subject: "Account verified !",
            text: "Your account has been successfully verified ! You can now use the analytics tool.",
        };

        config.gmail.transporter.sendMail(mail, (error) => {
            if (error) {
                throw error;
            }
        });

        return res.status(200).send({
            msg: `user ${user.id} Successfully verified`,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: error });
    }
});

userRouter.get("/:id/app-id", checkAuth(false), async (req, res) => {
    //generate new app id
    try {
        if (req.user.role != 1 && req.user.id != req.params.id) {
            return res.status(403).send({ error: "Higher privileges needed" });
        }

        const appId = crypto.randomBytes(15).toString("hex");
        await userService.update(
            {
                id: req.params.id,
            },
            { appId }
        );

        return res.status(200).send({
            msg: "There is your new app id",
            data: appId,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: error });
    }
});

userRouter.put("/:id/dashboard", checkAuth(false), async (req, res) => {
    try {
        if (req.user.role != 1 && req.user.id != req.params.id) {
            return res.status(403).send({ error: "Higher privileges needed" });
        }

        const user = await userService.update(
            {
                id: req.params.id,
            },
            { dashboardOptions: req.body.dashboardOptions }
        );

        return res.status(200).send({
            msg: "There is your new dashboard",
            data: user.dashboardOptions,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: error });
    }
});

userRouter.get("/:id", checkAuth(false), async (req, res) => {
    try {
        // Can't get user if it's not you and your not admin
        if (req.user.role != 1 && req.user.id != req.params.id) {
            return res.status(403).send({ error: "Higher privileges needed" });
        }

        const user = await userService.findBy({
            id: req.params.id,
        });
        delete user.password;
        delete user.appId;

        return res.status(200).send({ data: user });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: error });
    }
});

userRouter.put("/:id", checkAuth(false), async (req, res) => {
    try {
        if (req.user.role != 1 && req.user.id != req.params.id) {
            return res.status(403).send({ error: "Higher privileges needed" });
        }

        const user = await userService.findBy({
            id: req.params.id,
        });

        if (!user) res.status(404).send({ error: "User not found" });

        const { firstname, lastname, email, password } = req.body;
        const encryptedPassword = await encryptPassword(password);

        const updatedUser = await userService.update(
            {
                id: req.params.id,
            },
            { firstname, lastname, email, password: encryptedPassword }
        );
        updatedUser.password = null;
        updatedUser.appId = null;

        return res.status(200).send({
            msg: "User updated !",
            data: updatedUser,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: error });
    }
});

userRouter.delete("/:id", checkAuth(false), async (req, res) => {
    try {
        // Can't delete user if it's not you and your not admin
        if (req.user.role != 1 && req.user.id != req.params.id) {
            return res.status(403).send({ error: "Higher privileges needed" });
        }

        await userService.delete({
            id: req.params.id,
        });

        return res.status(200).send({
            msg: `User ${req.params.id} deleted !`,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: error });
    }
});
