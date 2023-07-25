import { Router } from "express";
import { userService } from "../services/user.js";
import { checkAuth } from "../middlewares/checkAuth.js";
import { config } from "../env.js";
import { requestTiming } from "../monitoring/index.js";
import { encryptPassword } from "../utils/auth.js";
import crypto from "crypto";

export const userRouter = Router();

userRouter.get("/profile", checkAuth(true), async (req, res) => {
    try {
        const returnedUser = {
            ...req.user.dataValues
        };

        delete returnedUser.password;
        delete returnedUser.id;
        
        res.status(200).send(returnedUser);
        return;
    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: error });
    }
}); 

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
            subject: "Compte vérifé !",
            text: "Votre compte a été vérifié, vous pouvez maintenant utiliser l'outil d'analytics !",
        };

        config.gmail.transporter.sendMail(mail, (error) => {
            if (error) {
                throw error;
            }
        });

        return res.status(200).send({
            msg: `L'utilisateur ${user.email} a été vérifié`,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: error });
    }
});

userRouter.get("/app-id", checkAuth(false), async (req, res) => {
    //generate new app id
    try {
        const appId = crypto.randomBytes(15).toString("hex");
        await userService.update(
            {
                id: req.user.id,
            },
            { appId }
        );

        return res.status(200).send({
            msg: "Nouvel ID généré !",
            data: appId,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: error });
    }
});

userRouter.get("/dashboard", checkAuth(false), async (req, res) => {
    try {
        const user = await userService.findBy({
            id: req.user.id,
        });

        return res.status(200).send({
            data: user.dashboardOptions,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: error });
    }
});

userRouter.put("/dashboard", checkAuth(false), async (req, res) => {
    try {
        const user = await userService.update(
            {
                id: req.params.id,
            },
            { dashboardOptions: req.body.dashboardOptions }
        );

        return res.status(200).send({
            msg: "Dashboard modifié !",
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

        return res.status(200).send({ data: user });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: error });
    }
});

userRouter.put("/", checkAuth(false), async (req, res) => {
    try {
        const user = await userService.findBy({
            id: req.user.id,
        });

        if (!user) res.status(404).send({ error: "User not found" });

        const { firstname, lastname, email, password } = req.body;


        const updateUser = {
            firstname, lastname, email
        };

        if (password) {
            const encryptedPassword = await encryptPassword(password);
            updateUser.password = encryptedPassword;
        }

        const updatedUser = await userService.update(
            {
                id: req.user.id,
            },
            updateUser
        );
        
        updatedUser.password = null;
        updatedUser.appId = null;

        return res.status(200).send({
            msg: "Utilisateur modifié !",
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
            msg: `Utilisateur ${req.params.id} supprimé !`,
        });
    } catch (error) {
        console.log(error);
        return res.status(400).send({ error: error });
    }
});
