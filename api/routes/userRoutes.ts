import { Router } from "express";
import * as userController from "../controllers/userController";
import { userAuthMiddleware } from "../middlewares/authMiddleware";

const router = Router();
router.post("/", userAuthMiddleware, userController.createUser);
router.get("/getprofile", userAuthMiddleware, userController.getUser);
router.patch("/updateprofile", userAuthMiddleware, userController.updateUser);

export default router;
