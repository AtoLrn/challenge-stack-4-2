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

        if (user) return res.status(409).send({ error: "Email déjà prit" });

        if (!req.file) return res.status(400).send({ error: "Un fichier est nécessaire pour les kbis" });

        if (req.file.mimetype !== "application/pdf")
            return res.status(400).send({ error: "Le fichier doit être pdf" });

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
                return res.status(500).send({ error: "Erreur durant l'upload du fichier" });
            }
            console.log("Data successfully sent");
        });

        const encryptedPassword = await encryptPassword(password);

        await userService.create({
            firstname,
            lastname,
            email,
            password: encryptedPassword,
            isVerified: false,
            societyName,
            websiteUrl: new URL(websiteUrl).hostname,
            kbisFileUrl: `https://challenge-stack.s3.gra.io.cloud.ovh.net/${fileName}`,
            role: 2,
            dashboardOptions: JSON.stringify({}),
        });

        const mail = {
            from: config.gmail.user,
            to: email,
            subject: "Compte crée !",
            text: "Votre compte a été crée ! Vous n'avez plus qu'à attendre qu'un administrateur valide votre compte !",
        };

        config.gmail.transporter.sendMail(mail, (error) => {
            if (error) {
                throw error;
            }
        });

        return res.status(200).send({
            msg: "Votre compte a été crée !",
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
            return res.status(404).send({ error: "Il n'y a pas d'utilisateur avec cet email" });
        }

        const isPasswordValid = await checkPassword(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).send({ error: "Mauvais mot de passe" });
        } else if (!user.isVerified) {
            return res.status(401).send({ error: "Votre compte n'a pas été vérifié" });
        }

        const token = generateToken(user.id);

        return res.status(200).send({
            msg: "Identification réussie !",
            token: token,
        });
    } catch (error) {
        console.log(error)
        return res.status(400).send({ error: error });
    } finally {
        end();
    }
});
