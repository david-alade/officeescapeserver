import { NextFunction, Response } from "express";
import * as userService from "../services/userService";
import { AuthRequest } from "../middlewares/authMiddleware";

export const createUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userService.createUser(req.tokenUserID!);
    console.log("User created");
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
