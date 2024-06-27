import { Request, Response, NextFunction } from 'express';
import * as eventService from '../services/eventService';

export const getEvents = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = parseInt(req.query.userId as string, 10);
    const { jpmcLocation } = req.body;

    const events = await eventService.getEvents(userId, jpmcLocation);
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching events' });
  }
};
