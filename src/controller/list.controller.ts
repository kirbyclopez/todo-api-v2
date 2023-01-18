import { Request, Response } from "express";
import {
  CreateListInput,
  DeleteListInput,
  GetListInput,
  UpdateListInput,
} from "../schema/list.schema";
import {
  createList,
  deleteList,
  findAndReplaceList,
  findList,
  findLists,
} from "../service/list.service";
import logger from "../utils/logger";

export const createListHandler = async (
  req: Request<{}, {}, CreateListInput["body"]>,
  res: Response
) => {
  try {
    const userId = res.locals.user.uid;
    const list = await createList({ ...req.body, userId });

    return res.status(201).send(list);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send({ message: e.message });
  }
};

export const getListsHandler = async (req: Request, res: Response) => {
  const userId = res.locals.user.uid;
  const lists = await findLists({ userId });

  return res.send(lists);
};

export const getListHandler = async (
  req: Request<GetListInput["params"]>,
  res: Response
) => {
  const userId = res.locals.user.uid;
  const listId = req.params.listId;

  const list = await findList({ _id: listId, userId });

  if (!list) return res.status(404).send({ message: "Resource not found" });

  return res.send(list);
};

export const updateListHandler = async (
  req: Request<UpdateListInput["params"]>,
  res: Response
) => {
  const userId = res.locals.user.uid;
  const listId = req.params.listId;
  const update = req.body;

  const list = await findList({ _id: listId, userId });

  if (!list) return res.status(404).send({ message: "Resource not found" });

  const updatedList = await findAndReplaceList({ _id: listId }, update, {
    new: true,
  });

  return res.send(updatedList);
};

export const deleteListHandler = async (
  req: Request<DeleteListInput["params"]>,
  res: Response
) => {
  const userId = res.locals.user.uid;
  const listId = req.params.listId;

  const list = await findList({ _id: listId, userId });

  if (!list) return res.status(404).send({ message: "Resource not found" });

  await deleteList({ _id: listId });

  return res.status(200).send({ message: "List was successfully deleted." });
};
