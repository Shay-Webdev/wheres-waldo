import { Router } from "express";
import {
  checkClickedCoordinates,
  getAllGame,
  getCharacterDetail,
  getCharacterLogoImage,
  getGameDetail,
  getGameImage,
} from "../controllers/gameController";

const router = Router();

router.route("/").get(getAllGame);
router.route("/:id").get(getGameDetail);
router.route("/:id/img").get(getGameImage);
router.route("/:id/character/:characterId/logo").get(getCharacterLogoImage);
router.route("/:id/character/:characterId").get(getCharacterDetail);
router
  .route("/:id/character/:characterId/check_coordinates")
  .put(checkClickedCoordinates);

export default router;
