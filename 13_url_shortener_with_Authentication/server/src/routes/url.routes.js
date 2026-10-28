import {Router} from 'express'
import { authenticateMiddleware } from '../middleware/authenticate_Middleware.js';
import { generateLongToShortUrlController } from '../controller/url.controller.js';

const router = Router();

router.post('/', authenticateMiddleware, generateLongToShortUrlController )

export default router 