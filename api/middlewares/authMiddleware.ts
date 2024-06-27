/* eslint-disable no-console */
// import * as admin from "firebase-admin";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";

dotenv.config();

export interface AuthRequest extends Request {
  tokenUserID?: string;
}

// if (process.env.STATE === "DEVELOPMENT") {
//   admin.initializeApp({
//     credential: admin.credential.cert(
//       "/Users/david/Downloads/oneswipe/keys/oneswipe-redantai-firebase-adminsdk-n7s5d-203a7d3e77.json"
//     ),
//   });
// } else {
//   admin.initializeApp({
//     credential: admin.credential.applicationDefault(),
//   });
// }

export const userAuthMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const testHeader = req.headers["x-my-app-test-auth"];

  if (testHeader) {
    console.log("Test header found");
    const userID = testHeader as string;

    if (userID) {
      req.tokenUserID = userID;
    }

    next();
    return;
  }

  // const token = req.headers.authorization?.split("Bearer ")[1];
  // if (!token) {
  //   console.log("No token provided");
  //   return res.status(401).send("Unauthorized: No token provided");
  // }

  // try {
  //   // const decodedToken = await admin.auth().verifyIdToken(token);
  //   req.tokenUserID = decodedToken.uid;
  //   console.log(`Succesfully decoded token: ${decodedToken.uid}`);
  //   next();
  // } catch (error) {
  //   console.log("Invalid token", error);
  //   return res.status(401).send("Unauthorized: Invalid token");
  // }
};
