import express from "express";
import {
  createItemHandler,
  deleteItemHandler,
  getItemHandler,
  patchItemHandler,
  updateItemHandler,
} from "../controller/item.controller";
import requireUser from "../middleware/requireUser.middleware";
import validateResource from "../middleware/validateResource.middleware";
import {
  createItemSchema,
  deleteItemSchema,
  getItemSchema,
  patchItemSchema,
  updateItemSchema,
} from "../schema/item.schema";

export const itemRouter = express.Router();

itemRouter.get(
  "/:itemId",
  requireUser,
  validateResource(getItemSchema),
  getItemHandler
);

itemRouter.post(
  "/",
  requireUser,
  validateResource(createItemSchema),
  createItemHandler
);

itemRouter.put(
  "/:itemId",
  requireUser,
  validateResource(updateItemSchema),
  updateItemHandler
);

itemRouter.patch(
  "/:itemId",
  requireUser,
  validateResource(patchItemSchema),
  patchItemHandler
);

itemRouter.delete(
  "/:itemId",
  requireUser,
  validateResource(deleteItemSchema),
  deleteItemHandler
);
