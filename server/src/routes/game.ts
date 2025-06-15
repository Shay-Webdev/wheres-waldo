import { Router } from "express";
import path from "path";
import { getGameImage } from "../controllers/gameController";

const router = Router();
const filePath = path.join(__dirname, "../..", "public", "waldo-logo-3.jpg");

router.route("/:id/img").get(getGameImage);

export default router;
