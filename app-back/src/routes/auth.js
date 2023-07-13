const { Router } = require("express");
const userService = require("../services/user")
const { encryptPassword } = require("../utils/auth")

const router = Router();

router.post("/register", async (req, res, next) => {
    const { 
        firstname, 
        lastname, 
        email, 
        password,
        societyName,
        websiteUrl
    } = req.body
    try {
        const user = await userService.findBy({
            email: email
        })

        if (user) {
            return res.status(409).send({error: "Email already taken"});
        } else {
            const encryptedPassword = await encryptPassword(password)

            const createdUser = await userService.create({
                firstname,
                lastname,
                email,
                password: encryptedPassword,
                isVerified: false,
                societyName,
                websiteUrl,
                kbisFileUrl: "dummy"
            })

            return res.status(200).send({
                msg: "User created !",
                data: createdUser
            })
        }

    } catch (error) {
        console.log(error);
    }
})

module.exports = router;
