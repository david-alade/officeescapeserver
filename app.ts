/* eslint-disable import/no-named-as-default */
import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { errorHandler } from "./api/middlewares/errorHandler";
import userRoutes from "./api/routes/userRoutes";

dotenv.config();

const app: Express = express();
app.use(express.json());

// Middleware to log incoming requests
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[server]: Incoming request for ${req.method} ${req.url}`);
  console.log(`[server]: Request body: ${JSON.stringify(req.body)}`);
  next();
});

// Routes
app.use("/api/users", userRoutes);

// Error handler middleware (ensure this goes after all routes)
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

export { app };
