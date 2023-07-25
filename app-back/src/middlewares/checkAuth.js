import { verifyToken } from "../utils/auth.js";
import { userService } from "../services/user.js";

export const checkAuth = (needAdmin) => async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).send({ error: "Token needed" });
    } else {
        try {
            const decoded = verifyToken(token);
            const user = await userService.findBy({
                id: decoded.userId,
            });

            if (!user) {
                return res.status(401).send({ error: "Your token seem wrong" });
            }

            if (!user.isVerified) {
                return res.status(403).send({ error: "User not verified" });
            }

            if (needAdmin && user.role != 1) {
                return res.status(403).send({ error: "Higher privileges needed" });
            }
            req.user = user;

            next();
        } catch (error) {
            console.error(error);
            return res.status(400).send({ error: "Bad token" });
        }
    }
};
