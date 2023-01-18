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
import ItemModel from "../model/item.model";

export const createList = async (
  input: DocumentDefinition<IBaseListDocument>
) => {
  return ListModel.create(input);
};

export const findLists = async (
  query: FilterQuery<IListDocument>,
  options: QueryOptions = { lean: true }
) => {
  return ListModel.find(query, {}, options);
};

export const findList = async (
  query: FilterQuery<IListDocument>,
  options: QueryOptions = { lean: true }
) => {
  return ListModel.findOne(query, {}, options);
};

export const findAndReplaceList = async (
  query: FilterQuery<IListDocument>,
  update: UpdateQuery<IListDocument>,
  options: QueryOptions
) => {
  return ListModel.findOneAndReplace(query, update, options);
};

export const deleteList = async (query: FilterQuery<IListDocument>) => {
  ItemModel.deleteMany({ listId: query._id });
  return ListModel.deleteOne(query);
};

export const clearLists = async () => {
  ItemModel.deleteMany();
  return ListModel.deleteMany();
};
