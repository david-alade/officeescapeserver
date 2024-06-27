import { Router } from 'express';
import * as eventController from '../controllers/eventController';
import { userAuthMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', userAuthMiddleware, eventController.getEvents);
router.post('/create/', userAuthMiddleware, eventController.createEvent);
router.patch('/update/', userAuthMiddleware, eventController.updateEvent);

export default router;
