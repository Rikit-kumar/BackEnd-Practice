import { Router } from "express";
import { refreshTokenController, registerUserController, userDetailController } from "../controller/auth.controller.js";

const router = Router();

router.post("/register", registerUserController);
router.get('/me', userDetailController)
router.post('/refresh', refreshTokenController)

export default router;
