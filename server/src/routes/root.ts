import { Router } from "express";
import { rootController } from "../controllers/rootController";

const router = Router();

router.route("/").get(rootController);

export default router;
