import { Router } from "express";
import { deleteUrlController, generateLongToShortUrlController, getAllUrlsController, redirectOriginalUrlController } from "../controller/url.controller.js";

const router = Router();

router.post("/api/url", generateLongToShortUrlController);
router.get("/api/url/all", getAllUrlsController)
router.get("/:code", redirectOriginalUrlController)
router.delete("/:id", deleteUrlController)

export default router;
