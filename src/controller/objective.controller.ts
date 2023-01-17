import { Request, Response } from "express";
import {
  CreateObjectiveInput,
  DeleteObjectiveInput,
  GetObjectiveInput,
  UpdateObjectiveInput,
} from "../schema/objective.schema";
import {
  createObjective,
  deleteObjective,
  findAndReplaceObjective,
  findAndUpdateObjective,
  findObjective,
  findObjectives,
} from "../service/objective.service";
import logger from "../utils/logger";

export const createObjectiveHandler = async (
  req: Request<{}, {}, CreateObjectiveInput["body"]>,
  res: Response
) => {
  try {
    const objective = await createObjective(req.body);

    return res.status(201).send(objective);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send({ message: e.message });
  }
};

export const getObjectivesHandler = async (req: Request, res: Response) => {
  const objectives = await findObjectives({});

  return res.send(objectives);
};

export const getObjectiveHandler = async (
  req: Request<GetObjectiveInput["params"]>,
  res: Response
) => {
  const objectiveId = req.params.objectiveId;

  const objective = await findObjective({ _id: objectiveId });

  if (!objective)
    return res.status(404).send({ message: "Resource not found" });

  return res.send(objective);
};

export const updateObjectiveHandler = async (
  req: Request<UpdateObjectiveInput["params"]>,
  res: Response
) => {
  const objectiveId = req.params.objectiveId;
  const update = req.body;

  const objective = await findObjective({ _id: objectiveId });

  if (!objective)
    return res.status(404).send({ message: "Resource not found" });

  const updatedObjective = await findAndReplaceObjective(
    { _id: objectiveId },
    update,
    { new: true }
  );

  return res.send(updatedObjective);
};

export const patchObjectiveHandler = async (
  req: Request<UpdateObjectiveInput["params"]>,
  res: Response
) => {
  const objectiveId = req.params.objectiveId;
  const update = req.body;

  const objective = await findObjective({ _id: objectiveId });

  if (!objective)
    return res.status(404).send({ message: "Resource not found" });

  const updatedObjective = await findAndUpdateObjective(
    { _id: objectiveId },
    update,
    { new: true }
  );

  return res.send(updatedObjective);
};

export const deleteObjectiveHandler = async (
  req: Request<DeleteObjectiveInput["params"]>,
  res: Response
) => {
  const objectiveId = req.params.objectiveId;

  const objective = await findObjective({ _id: objectiveId });

  if (!objective)
    return res.status(404).send({ message: "Resource not found" });

  await deleteObjective({ _id: objectiveId });

  return res
    .status(200)
    .send({ message: "Objective was successfully deleted." });
};
