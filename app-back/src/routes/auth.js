import { Router } from "express";
import { userService } from "../services/user.js";
import { encryptPassword, checkPassword, generateToken } from "../utils/auth.js";

const authRouter = Router();

authRouter.post("/register", async (req, res, _) => {
    const { firstname, lastname, email, password, societyName, websiteUrl } = req.body;

    try {
        const user = await userService.findBy({
            email: email,
        });

        if (user) {
            return res.status(409).send({ error: "Email already taken" });
        }

        const encryptedPassword = await encryptPassword(password);

        const createdUser = await userService.create({
            firstname,
            lastname,
            email,
            password: encryptedPassword,
            isVerified: false,
            societyName,
            websiteUrl,
            kbisFileUrl: "dummy",
        });

        return res.status(200).send({
            msg: "User created !",
            data: createdUser,
        });
    } catch (error) {
        console.log(error);
    }
});

authRouter.post("/login", async (req, res, _) => {
    const { email, password } = req.body;

    try {
        const user = await userService.findBy({
            email: email,
        });

        if (!user) {
            return res.status(404).send({ error: "No user with this email" });
        }

        const isPasswordValid = await checkPassword(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).send({ error: "Wrong password" });
        } else if (!user.isVerified) {
            return res.status(401).send({ error: "User not verified" });
        }

        const token = generateToken(user);

        return res.status(200).send({
            msg: "Successfully logged in",
            token: token,
        });
    } catch (error) {
        console.log(error);
    }
});

export default authRouter;
