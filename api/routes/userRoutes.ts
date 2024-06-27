import { Router } from "express";
import * as userController from "../controllers/userController";
import { userAuthMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", userAuthMiddleware, userController.createUser);

export default router;
