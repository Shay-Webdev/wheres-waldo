import { Router } from "express";
import path from "path";
import {
  getCharacterLogoImage,
  getGameImage,
} from "../controllers/gameController";

const router = Router();
const filePath = path.join(__dirname, "../..", "public", "waldo-logo-3.jpg");

router.route("/:id/img").get(getGameImage);
router.route("/:id/character/:characterId").get(getCharacterLogoImage);

export default router;
