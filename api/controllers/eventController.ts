import { Request, Response, NextFunction } from 'express';
import * as eventService from '../services/eventService';
import { AuthRequest } from '../middlewares/authMiddleware';

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

export const createEvent = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      id,
      location,
      description,
      images,
      userId,
      category,
      jpmcLocation,
    } = req.body;
    await eventService.createEvent(
      id,
      location,
      description,
      images,
      userId,
      category,
      jpmcLocation
    );
    console.log('Event created');
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

export const updateEvent = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const eventId = parseInt(req.query.eventId as string, 10);
    const { location, description, images, category, jpmcLocation } = req.body;
    await eventService.updateEvent(
      eventId,
      location,
      description,
      images,
      category,
      jpmcLocation
    );
    console.log('Event updated');
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
