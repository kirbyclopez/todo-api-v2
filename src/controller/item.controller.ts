import { Request, Response } from "express";
import {
  CreateItemInput,
  DeleteItemInput,
  GetItemInput,
  GetItemsInput,
  PatchItemInput,
  UpdateItemInput,
} from "../schema/item.schema";
import {
  createItem,
  deleteItem,
  findAndReplaceItem,
  findAndUpdateItem,
  findItem,
  findItems,
} from "../service/item.service";
import logger from "../utils/logger";
import { findList } from "../service/list.service";

export const createItemHandler = async (
  req: Request<{}, {}, CreateItemInput["body"]>,
  res: Response
) => {
  try {
    const userId = res.locals.user.uid;
    const list = await findList({ _id: req.body.listId, userId });

    if (!list) return res.status(404).send({ message: "Resource not found" });

    const item = await createItem(req.body);

    return res.status(201).send(item);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send({ message: e.message });
  }
};

export const getItemsHandler = async (
  req: Request<GetItemsInput["params"]>,
  res: Response
) => {
  const userId = res.locals.user.uid;
  const list = await findList({ _id: req.params.listId, userId });

  if (!list) return res.status(404).send({ message: "Resource not found" });

  const items = await findItems({ listId: req.params.listId });

  return res.send(items);
};

export const getItemHandler = async (
  req: Request<GetItemInput["params"]>,
  res: Response
) => {
  const userId = res.locals.user.uid;
  const itemId = req.params.itemId;

  const item = await findItem({ _id: itemId });

  if (!item) return res.status(404).send({ message: "Resource not found" });

  const list = await findList({ _id: item.listId, userId });

  if (!list) return res.status(404).send({ message: "Resource not found" });

  return res.send(item);
};

export const updateItemHandler = async (
  req: Request<UpdateItemInput["params"]>,
  res: Response
) => {
  const userId = res.locals.user.uid;
  const itemId = req.params.itemId;
  const update = req.body;

  const item = await findItem({ _id: itemId });

  if (!item) return res.status(404).send({ message: "Resource not found" });

  const list = await findList({ _id: item.listId, userId });

  if (!list) return res.status(404).send({ message: "Resource not found" });

  const updatedItem = await findAndReplaceItem({ _id: itemId }, update, {
    new: true,
  });

  return res.send(updatedItem);
};

export const patchItemHandler = async (
  req: Request<UpdateItemInput["params"]>,
  res: Response
) => {
  const userId = res.locals.user.uid;
  const itemId = req.params.itemId;
  const update = req.body;

  const item = await findItem({ _id: itemId });

  if (!item) return res.status(404).send({ message: "Resource not found" });

  const list = await findList({ _id: item.listId, userId });

  if (!list) return res.status(404).send({ message: "Resource not found" });

  const updatedItem = await findAndUpdateItem({ _id: itemId }, update, {
    new: true,
  });

  return res.send(updatedItem);
};

export const deleteItemHandler = async (
  req: Request<DeleteItemInput["params"]>,
  res: Response
) => {
  const userId = res.locals.user.uid;
  const itemId = req.params.itemId;

  const item = await findItem({ _id: itemId });

  if (!item) return res.status(404).send({ message: "Resource not found" });

  const list = await findList({ _id: item.listId, userId });

  if (!list) return res.status(404).send({ message: "Resource not found" });

  await deleteItem({ _id: itemId });

  return res.status(200).send({ message: "Item was successfully deleted." });
};
