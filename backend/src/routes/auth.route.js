const {Router}  = require("express");
const authController = require("../controller/auth.controller")
const authRouter = Router()
const authMiddleWare = require("../middleware/auth.middleware")

authRouter.post("/register",authController.registerUser)
authRouter.post("/login",authController.loginUser)
authRouter.get("/get-me",authMiddleWare.getToken,authController.getUser)
authRouter.post("/logout",authMiddleWare.getToken,authController.logout)

module.exports = authRouter
