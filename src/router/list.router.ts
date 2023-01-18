import express from "express";
import {
  createListHandler,
  deleteListHandler,
  getListHandler,
  getListsHandler,
  updateListHandler,
} from "../controller/list.controller";
import requireUser from "../middleware/requireUser.middleware";
import validateResource from "../middleware/validateResource.middleware";
import {
  createListSchema,
  deleteListSchema,
  getListSchema,
  updateListSchema,
} from "../schema/list.schema";
import { getItemsSchema } from "../schema/item.schema";
import { getItemsHandler } from "../controller/item.controller";

export const listRouter = express.Router();

listRouter.get("/", requireUser, getListsHandler);

listRouter.get(
  "/:listId",
  requireUser,
  validateResource(getListSchema),
  getListHandler
);

listRouter.post(
  "/",
  requireUser,
  validateResource(createListSchema),
  createListHandler
);

listRouter.put(
  "/:listId",
  requireUser,
  validateResource(updateListSchema),
  updateListHandler
);

listRouter.delete(
  "/:listId",
  requireUser,
  validateResource(deleteListSchema),
  deleteListHandler
);

// For getting items in a list
listRouter.get(
  "/:listId/items",
  requireUser,
  validateResource(getItemsSchema),
  getItemsHandler
);
