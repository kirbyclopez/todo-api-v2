import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from "mongoose";
import ObjectiveModel, {
  BaseObjectiveDocument,
  ObjectiveDocument,
} from "../model/objective.model";

export const createObjective = async (
  input: DocumentDefinition<BaseObjectiveDocument>
) => {
  return ObjectiveModel.create(input);
};

export const findObjectives = async (
  query: FilterQuery<ObjectiveDocument>,
  options: QueryOptions = { lean: true }
) => {
  return ObjectiveModel.find(query, {}, options);
};

export const findObjective = async (
  query: FilterQuery<ObjectiveDocument>,
  options: QueryOptions = { lean: true }
) => {
  return ObjectiveModel.findOne(query, {}, options);
};

export const findAndReplaceObjective = async (
  query: FilterQuery<ObjectiveDocument>,
  update: UpdateQuery<ObjectiveDocument>,
  options: QueryOptions
) => {
  return ObjectiveModel.findOneAndReplace(query, update, options);
};

export const findAndUpdateObjective = async (
  query: FilterQuery<ObjectiveDocument>,
  update: UpdateQuery<ObjectiveDocument>,
  options: QueryOptions
) => {
  return ObjectiveModel.findOneAndUpdate(query, update, options);
};

export const deleteObjective = async (
  query: FilterQuery<ObjectiveDocument>
) => {
  return ObjectiveModel.deleteOne(query);
};

export const clearObjectives = async () => {
  return ObjectiveModel.deleteMany();
};
