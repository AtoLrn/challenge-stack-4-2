import dotenv from "dotenv";

dotenv.config();

export const config = {
    port: process.env.PORT,
    jwt_secret: process.env.JWT_SECRET,
    db: {
        mongo_url: process.env.MONGO_URL,
        postgre_host: process.env.POSTGRE_HOST,
        postgre_user: process.env.POSTGRE_USER,
        postgre_password: process.env.POSTGRE_PASSWORD,
        postgre_database: process.env.POSTGRE_DATABASE,
    },
};
