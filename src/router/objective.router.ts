import express, { Request, Response } from "express";
import {
  createObjectiveHandler,
  deleteObjectiveHandler,
  getObjectiveHandler,
  getObjectivesHandler,
  patchObjectiveHandler,
  updateObjectiveHandler,
} from "../controller/objective.controller";
import requireUser from "../middleware/requireUser.middleware";
import validateResource from "../middleware/validateResource.middleware";
import {
  createObjectiveSchema,
  deleteObjectiveSchema,
  getObjectiveSchema,
  patchObjectiveSchema,
  updateObjectiveSchema,
} from "../schema/objective.schema";

export const objectiveRouter = express.Router();

objectiveRouter.get("/", requireUser, getObjectivesHandler);

objectiveRouter.get(
  "/:objectiveId",
  requireUser,
  validateResource(getObjectiveSchema),
  getObjectiveHandler
);

objectiveRouter.post(
  "/",
  requireUser,
  validateResource(createObjectiveSchema),
  createObjectiveHandler
);

objectiveRouter.put(
  "/:objectiveId",
  requireUser,
  validateResource(updateObjectiveSchema),
  updateObjectiveHandler
);

objectiveRouter.patch(
  "/:objectiveId",
  requireUser,
  validateResource(patchObjectiveSchema),
  patchObjectiveHandler
);

objectiveRouter.delete(
  "/:objectiveId",
  requireUser,
  validateResource(deleteObjectiveSchema),
  deleteObjectiveHandler
);
