import { Router } from "express";
import { loginUserController, meApiController, registerUserController, tokenRefreshController } from "../controllers/auth.controllers.js";
import { loginValidator, registerValidator } from "../validator/auth.validator.js";
import { authenticate } from "../middleware/auth.middleware.js";

const router = Router()

router.post('/register', registerValidator, registerUserController)
router.post('/login', loginValidator, loginUserController)
router.post('/refresh', tokenRefreshController)

router.post('/logout', authenticate, )
router.get('/me', authenticate, meApiController)

export default router