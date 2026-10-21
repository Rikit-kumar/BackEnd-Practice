import { Router } from "express";
import { loginUserController, registerUserController, tokenRefreshController } from "../controllers/auth.controllers.js";
import { loginValidator, registerValidator } from "../validator/auth.validator.js";

const router = Router()

router.post('/register', registerValidator, registerUserController)
router.post('/login', loginValidator, loginUserController)
router.post('/refresh', tokenRefreshController)

export default router