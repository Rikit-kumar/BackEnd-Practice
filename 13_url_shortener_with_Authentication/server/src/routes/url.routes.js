import {Router} from 'express'
import { authenticateMiddleware } from '../middleware/authenticate_Middleware.js';
import { generateLongToShortUrlController, redirectOriginalUrlController } from '../controller/url.controller.js';
import { urlValidator } from '../validator/url.validator.js';

const router = Router();

router.post('/', authenticateMiddleware, urlValidator, generateLongToShortUrlController )
router.get("/:code", redirectOriginalUrlController)
router.get("/all")

export default router 