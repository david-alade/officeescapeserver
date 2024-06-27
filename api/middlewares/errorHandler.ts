import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    return next(err);
  }
  console.log("ERROR MIDDLEWARE HIT");
  console.log("Error: ", err);
  if (process.env.NODE_ENV === "development") {
    console.log("Error in dev: ", err);
    // console.error(err); // Log the error
    res.status(500).send(err.toString());
  } else {
    res.status(500).send(err.message);
  }
  next();
};
