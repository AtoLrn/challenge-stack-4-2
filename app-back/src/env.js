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
    ovh: {
        endpoint: process.env.OVH_ENDPOINT,
        appKey: process.env.OVH_APP_KEY,
        appSecret: process.env.OVH_APP_SECRET,
        consumerKey: process.env.OVH_CONSUMER_KEY,
    },
};
