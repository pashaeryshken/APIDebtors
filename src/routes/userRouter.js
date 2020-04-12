const express = require("express")
const {check} = require("express-validator/check");
const auth = require("../middleware/auth")
const {validationResult} = require("express-validator/check");

const userController = require("../controllers/userController")
const userRouter = express.Router();


userRouter.post("/signup", [
    check("userName", "Please Enter a Valid Username")
        .not()
        .isEmpty(),
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
        min: 6
    })
], async (request, response) => {
    const errors = validationResult(request)
    if (!errors.isEmpty()) {
        response.status(400).json({
            errors: errors.array()
        });
    }
    try {
        const user = await userController.signup(request.body);

        response.status(201).json(user);
    } catch (err) {
        response.status(400).json(err);
    }
});

userRouter.post("/login", [
    check("email", "Please enter a valid email").isEmail(),
    check("password", "Please enter a valid password").isLength({
        min: 6
    })
], async (request, response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({
            errors: errors.array()
        });
    }
    try {
        const {token , expiresIn} = await userController.login(request.body)

        response.status(201).json({token, expiresIn})
    } catch (err) {
        response.status(400).json(err);
    }
});

userRouter.get("/", auth, async (request, response) => {
    try {
        const user = await userController.getMe(request.user.id);

        response.status(200).json(user)
    } catch (err) {
        response.status(400).json(err)
    }
})

userRouter.get("/refresh-token", auth, async (request, response) => {
    const {token , expiresIn} = await userController.refreshToken(request.user.id);

    response.status(200).json({token, expiresIn})
})

module.exports = userRouter;
