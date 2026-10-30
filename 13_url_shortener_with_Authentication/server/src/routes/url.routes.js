import {Router} from 'express'
import { authenticateMiddleware } from '../middleware/authenticate_Middleware.js';
import { deleteApiController, generateLongToShortUrlController, getAllApisController, redirectOriginalUrlController } from '../controller/url.controller.js';
import { urlValidator } from '../validator/url.validator.js';

const router = Router();

router.post('/', authenticateMiddleware, urlValidator, generateLongToShortUrlController )
router.get("/all", authenticateMiddleware, getAllApisController)
router.get("/:code", redirectOriginalUrlController)
router.delete("/:id", authenticateMiddleware, deleteApiController)

export default router 