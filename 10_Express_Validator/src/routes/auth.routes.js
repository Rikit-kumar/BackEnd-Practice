import {Router} from 'express';
import { registerUserController } from '../controller/auth.controller.js';

const router = Router();

router.post('/register', registerUserController)

export default router;