import {
  DocumentDefinition,
  FilterQuery,
  QueryOptions,
  UpdateQuery,
} from "mongoose";
import ItemModel, {
  IBaseItemDocument,
  IItemDocument,
} from "../model/item.model";

export const createItem = async (
  input: DocumentDefinition<IBaseItemDocument>
) => {
  return ItemModel.create(input);
};

export const findItems = async (
  query: FilterQuery<IItemDocument>,
  options: QueryOptions = { lean: true }
) => {
  return ItemModel.find(query, {}, options);
};

export const findItem = async (
  query: FilterQuery<IItemDocument>,
  options: QueryOptions = { lean: true }
) => {
  return ItemModel.findOne(query, {}, options);
};

export const findAndReplaceItem = async (
  query: FilterQuery<IItemDocument>,
  update: UpdateQuery<IItemDocument>,
  options: QueryOptions
) => {
  return ItemModel.findOneAndReplace(query, update, options);
};

export const findAndUpdateItem = async (
  query: FilterQuery<IItemDocument>,
  update: UpdateQuery<IItemDocument>,
  options: QueryOptions
) => {
  return ItemModel.findOneAndUpdate(query, update, options);
};

export const deleteItem = async (query: FilterQuery<IItemDocument>) => {
  ItemModel.deleteMany({ itemId: query._id });
  return ItemModel.deleteOne(query);
};

export const clearItems = async () => {
  ItemModel.deleteMany();
  return ItemModel.deleteMany();
};
