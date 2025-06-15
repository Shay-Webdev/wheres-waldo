import { Router } from "express";
import path from "path";
import {
  checkClickedCoordinates,
  getCharacterDetail,
  getCharacterLogoImage,
  getGameDetail,
  getGameImage,
} from "../controllers/gameController";

const router = Router();
const filePath = path.join(__dirname, "../..", "public", "waldo-logo-3.jpg");

router.route("/:id").get(getGameDetail);
router.route("/:id/img").get(getGameImage);
router.route("/:id/character/:characterId/logo").get(getCharacterLogoImage);
router.route("/:id/character/:characterId").get(getCharacterDetail);
router
  .route("/:id/character/:characterId/check_coordinates")
  .get(checkClickedCoordinates);

export default router;
