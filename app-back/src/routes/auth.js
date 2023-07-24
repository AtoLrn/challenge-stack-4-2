import { Router } from "express";
import { userService } from "../services/user.js";
import { encryptPassword, checkPassword, generateToken } from "../utils/auth.js";
import multer from "multer";
import { config } from "../env.js";
import { requestTiming } from "../monitoring/index.js";
import { v4 as uuid } from "uuid";
import AWS from "aws-sdk";

export const authRouter = Router();

const upload = multer({
    storage: multer.memoryStorage(),
});

AWS.config.update({
    accessKeyId: config.ovh.accessKey,
    secretAccessKey: config.ovh.secretKey,
    endpoint: config.ovh.endpoint,
    s3ForcePathStyle: true,
});

const s3 = new AWS.S3();

authRouter.post("/register", upload.single("kbisFile"), async (req, res) => {
    const end = requestTiming.labels({ path: "register" }).startTimer();

    const { firstname, lastname, email, password, societyName, websiteUrl } = req.body;

    try {
        const user = await userService.findBy({
            email: email,
        });

        if (user) return res.status(409).send({ error: "Email already taken" });

        if (!req.file) return res.status(400).send({ error: "File needed for the kbis" });

        if (req.file.mimetype !== "application/pdf")
            return res.status(400).send({ error: "The file must be pdf" });

        const fileName = `${uuid()}.pdf`;
        const uploadParams = {
            Bucket: "challenge-stack",
            Key: fileName,
            Body: req.file.buffer,
            ACL: "public-read",
        };

        s3.upload(uploadParams, (err) => {
            if (err) {
                console.log(err);
                return res.status(500).send({ error: "Error while uploading file" });
            }
            console.log("Data successfully sent");
        });

        const encryptedPassword = await encryptPassword(password);

        const createdUser = await userService.create({
            firstname,
            lastname,
            email,
            password: encryptedPassword,
            isVerified: false,
            societyName,
            websiteUrl,
            kbisFileUrl: `https://challenge-stack.s3.gra.io.cloud.ovh.net/${fileName}`,
            role: 2,
            dashboardOptions: JSON.stringify({}),
        });

        const mail = {
            from: config.gmail.user,
            to: email,
            subject: "Account created !",
            text: "Your account has been successfully created ! You now have to wait for an admin to verify your account.",
        };

        config.gmail.transporter.sendMail(mail, (error) => {
            if (error) {
                throw error;
            }
        });

        return res.status(200).send({
            msg: "User created !",
            data: createdUser,
        });
    } catch (error) {
        return res.status(400).send({ error: error });
    } finally {
        end();
    }
});

authRouter.post("/login", async (req, res) => {
    const end = requestTiming.labels({ path: "login" }).startTimer();

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
    } finally {
        end();
    }
});
