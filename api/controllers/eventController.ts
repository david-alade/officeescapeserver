import { Request, Response, NextFunction } from "express";
import * as eventService from "../services/eventService";
import { AuthRequest } from "../middlewares/authMiddleware";
import * as aiService from "../services/AISERVICE";

export const getEvents = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { jpmcLocation } = req.body;
    console.log(req.tokenUserID);
    console.log(jpmcLocation);

    const events = await eventService.getEvents(
      req.tokenUserID! as unknown as number,
      jpmcLocation
    );
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Error fetching events" });
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
    console.log("Event created");
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
    console.log("Event updated");
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

export const recommendedAI = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { interests, query } = req.body as {
      interests: string;
      query: string;
    };

    await aiService.openAiStreamEventResponse(
      query + ". Here are my interests: " + interests,
      res
    );

  } catch (error) {
    next(error);
  }
};
