import { Router } from "express";
import { userService } from "../services/user.js";
import { encryptPassword, checkPassword, generateToken } from "../utils/auth.js";
import multer from "multer";
import ovh from "ovh";
import { config } from "../env.js";

const authRouter = Router();

//const client = ovh({
//endpoint: config.ovh.endpoint,
//appKey: config.ovh.appKey,
//appSecret: config.ovh.appSecret,
//consumerKey: config.ovh.consumerKey,
//})

const upload = multer({
    storage: multer.memoryStorage(),
});

authRouter.post("/register", upload.single("kbisFile"), async (req, res, _) => {
    const { firstname, lastname, email, password, societyName, kbisFile, websiteUrl } = req.body;

    try {
        const user = await userService.findBy({
            email: email,
        });

        if (user) {
            return res.status(409).send({ error: "Email already taken" });
        }

        //if(!kbisFile){
        //return res.status(400).send({ error: "File needed for the kbis" });
        //}

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
            role: 2,
        });

        //const uploadResult = await client.requestPromised(
        //"POST",
        //"url",
        //{
        //serviceName: "service name",
        //containerName: "container name",
        //data: req.file.buffer
        //}
        //)

        const mail = {
            from: config.gmail.user,
            to: email,
            subject: "Account created !",
            text: "Your account has been successfully created ! You now have to wait for an admin to verify your account."
        }

        config.gmail.transporter.sendMail(mail, (error) => {
            if(error) {
                throw error
            }
        })

        return res.status(200).send({
            msg: "User created !",
            data: createdUser,
        });
    } catch (error) {
        return res.status(400).send({ error: error });
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
        return res.status(400).send({ error: error });
    }
});

export default authRouter;
