import { verifyToken } from "../utils/auth.js";
import { userService } from "../services/user.js";

export const checkAuth = (needAdmin) => async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        res.status(401).send({ error: "Token needed" });
    } else {
        const decoded = verifyToken(token);

        const user = await userService.findBy({
            id: decoded.userId,
        });

        if (needAdmin && user.role != 1) {
            res.status(403).send({ error: "Higher privileges needed" });
        }

        next();
    }
};
