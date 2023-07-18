import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

export const config = {
    adminPassword: process.env.ADMIN_PASSWORD,
    port: process.env.PORT,
    jwt_secret: process.env.JWT_SECRET,
    db: {
        mongo_url: process.env.MONGO_URL,
        postgre_host: process.env.POSTGRE_HOST,
        postgre_user: process.env.POSTGRE_USER,
        postgre_password: process.env.POSTGRE_PASSWORD,
        postgre_database: process.env.POSTGRE_DATABASE,
    },
    ovh: {
        endpoint: process.env.OVH_ENDPOINT,
        appKey: process.env.OVH_APP_KEY,
        appSecret: process.env.OVH_APP_SECRET,
        consumerKey: process.env.OVH_CONSUMER_KEY,
    },
    gmail: {
        user: process.env.GMAIL_USER,
        transporter: nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASSWORD
            }
        })
    }
};
