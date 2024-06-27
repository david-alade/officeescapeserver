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

export const updateUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const { name, bio, interests } = req.body;
  const user = await userService.updateUser(req.tokenUserID!, name, bio, interests);
  res.status(200).json(user);
};
