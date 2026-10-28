import { Router } from "express";
import {
  loginUserController,
  logoutUserController,
  registerUserController,
  tokenRefreshController,
  userDetailController,
} from "../controller/auth.controller.js";
import {
  loginValidator,
  registerValidator,
} from "../validator/auth.validator.js";
import { authenticateMiddleware } from "../middleware/authenticate_Middleware.js";

const router = Router();

router.post("/register", registerValidator, registerUserController);
router.post("/login", loginValidator, loginUserController);
router.post("/refresh", tokenRefreshController);

router.get("/me", authenticateMiddleware, userDetailController);
router.post("/logout", authenticateMiddleware, logoutUserController);

export default router;
