import {Router} from 'express';
import { registerUserController } from '../controller/auth.controller.js';
import { registerValidator } from '../validators/auth.validator.js';

const router = Router();

router.post('/register', registerValidator ,registerUserController)

export default router;