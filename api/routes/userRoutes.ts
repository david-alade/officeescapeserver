import { Router } from "express";
import * as userController from "../controllers/userController";
import { userAuthMiddleware } from "../middlewares/authMiddleware";

const router = Router();
router.post("/", userAuthMiddleware, userController.createUser);
router.get("/getProfile", userAuthMiddleware, userController.getUser);
router.patch("/updateProfile", userAuthMiddleware, userController.updateUser);
router.get("/getUserEvents", userAuthMiddleware, userController.getUserEvents);
export default router;
