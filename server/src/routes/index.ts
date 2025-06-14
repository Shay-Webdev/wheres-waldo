import { Router } from "express";
import rootRoute from "./root";
import gameRoute from "./game.ts";

const router = Router();
router.use("/", rootRoute);
router.use("/game", gameRoute);

export default router;
