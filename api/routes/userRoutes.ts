import { Router } from "express";
import * as userController from "../controllers/userController";
import { userAuthMiddleware } from "../middlewares/authMiddleware";

const router = Router();


router.post("/", userAuthMiddleware, userController.createUser);
router.get("/getProfile", userAuthMiddleware, userController.getUser);
router.patch("/updateProfile", userAuthMiddleware, userController.updateUser);
router.get("/getUserEvents", userAuthMiddleware, userController.getUserEvents);

router.post('/addFriend/:friendId', userAuthMiddleware, userController.addFriend);
router.delete('/removeFriend/:friendId', userAuthMiddleware, userController.removeFriend);
router.post('/sendFriendRequest/:friendId', userAuthMiddleware, userController.sendFriendRequest);
router.post('/acceptFriendRequest/:requestId', userAuthMiddleware, userController.acceptFriendRequest);
router.get('/getFriendEvents', userAuthMiddleware, userController.getFriendEvents);
export default router;
