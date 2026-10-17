import { Router } from "express";
import { registerUserController } from "../controllers/auth.controllers.js";
import { registerValidator } from "../validator/auth.validator.js";

const router = Router()

router.post('/register', registerValidator, registerUserController)

export default router