import { Router } from 'express';
import * as eventController from '../controllers/eventController';
import { userAuthMiddleware } from '../middlewares/authMiddleware';

const router = Router();

router.get('/', userAuthMiddleware, eventController.getEvents);

export default router;
