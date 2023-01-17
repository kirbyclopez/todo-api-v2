import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from "mongoose";
import ListModel, {
  IBaseListDocument,
  IListDocument,
} from "../model/list.model";

export const createList = async (
  input: DocumentDefinition<IBaseListDocument>
) => {
  return ListModel.create(input);
};

export const findLists = async (
  query: FilterQuery<IListDocument>,
  options: QueryOptions = { lean: true }
) => {
  return ListModel.find(query, {}, options).select({ items: 0 });
};

export const findList = async (
  query: FilterQuery<IListDocument>,
  options: QueryOptions = { lean: true }
) => {
  return ListModel.findOne(query, {}, options);
};

export const findAndUpdateList = async (
  query: FilterQuery<IListDocument>,
  update: UpdateQuery<IListDocument>,
  options: QueryOptions
) => {
  return ListModel.findOneAndUpdate(query, update, options);
};

export const deleteList = async (query: FilterQuery<IListDocument>) => {
  return ListModel.deleteOne(query);
};

export const clearLists = async () => {
  return ListModel.deleteMany();
};
