import { NextFunction, Response } from "express";
import * as userService from "../services/userService";
import { AuthRequest } from "../middlewares/authMiddleware";

export const createUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    await userService.createUser(req.tokenUserID!);
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};

export const getUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, bio, interests, jpmc_location } = req.body;
    const user = await userService.getUser(req.tokenUserID!, name, bio, interests, jpmc_location);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("Updating user profile");
    const { name, bio, interests, jpmc_location } = req.body;
    const user = await userService.updateUser(req.tokenUserID!, name, bio, interests, jpmc_location);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const getUserEvents = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("getting events user is attending");
    const events = await userService.getEventsForUser(req.tokenUserID!);
    res.status(200).json(events);
  } catch (error) {
    next(error);
  }
};

export const addFriend = async (
  req: AuthRequest, res: Response, next: NextFunction) => {
  try {
      const { friendId } = req.params;
      await userService.addFriend(req.tokenUserID!, friendId);
      res.status(200).json({ message: 'Friend added successfully.' });
  } catch (error) {
      next(error);
  }
};

export const removeFriend = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
      const { friendId } = req.params;
      await userService.removeFriend(req.tokenUserID!, friendId);
      res.status(200).json({ message: 'Friend removed successfully.' });
  } catch (error) {
      next(error);
  }
};

export const sendFriendRequest = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
      const { friendId } = req.params;
      await userService.sendFriendRequest(req.tokenUserID!, friendId);
      res.status(200).json({ message: 'Friend request sent successfully.' });
  } catch (error) {
      next(error);
  }
};

export const acceptFriendRequest = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
      const { requestId } = req.params;
      await userService.acceptFriendRequest(req.tokenUserID!, requestId);
      res.status(200).json({ message: 'Friend request accepted successfully.' });
  } catch (error) {
      next(error);
  }
};

export const getFriendEvents = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
      const friendEvents = await userService.getEventsForFriends(req.tokenUserID!);
      res.status(200).json(friendEvents);
  } catch (error) {
      next(error);
  }
};


