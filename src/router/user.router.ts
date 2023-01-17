import express, { Request, Response } from "express";
import { createUserHandler } from "../controller/user.controller";
import validateResource from "../middleware/validateResource.middleware";
import { createUserSchema } from "../schema/user.schema";

export const userRouter = express.Router();

// User Registration
userRouter.post("/", validateResource(createUserSchema), createUserHandler);
