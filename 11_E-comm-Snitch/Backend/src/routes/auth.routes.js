import { Router } from "express";
import { loginValidator, registerValidator } from "../validator/auth.validator.js";
import { loginUserController, refreshTokenController, registerUserController, userDetailController } from "../controllers/auth.controller.js";
import { authentication } from "../middleware/auth.middleware.js";

const router = Router();

router.post("/register", registerValidator, registerUserController);
router.post("/login", loginValidator, loginUserController)
router.post("/refresh", refreshTokenController)
router.get("/me", authentication ,userDetailController)

export default router;
