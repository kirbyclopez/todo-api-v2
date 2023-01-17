import express, { Request, Response } from "express";
import {
  createUserSessionHandler,
  deleteSessionHandler,
  getUserSessionsHandler,
} from "../controller/session.controller";
import requireUser from "../middleware/requireUser.middleware";
import validateResource from "../middleware/validateResource.middleware";
import { createSessionSchema } from "../schema/session.schema";

export const sessionRouter = express.Router();

// User Login
sessionRouter.post(
  "/login",
  validateResource(createSessionSchema),
  createUserSessionHandler
);

// Get Active Sessions
sessionRouter.get("/sessions", requireUser, getUserSessionsHandler);

// Delete Session
sessionRouter.delete("/sessions", requireUser, deleteSessionHandler);
