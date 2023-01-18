import { boolean, object, string, TypeOf } from "zod";

const payload = {
  body: object({
    listId: string({
      required_error: "List ID is required",
    }),
    name: string({
      required_error: "Name is required",
    }),
    isComplete: boolean().optional(),
  }),
};

const patchPayload = {
  body: object({
    listId: string().optional(),
    name: string().optional(),
    isComplete: boolean().optional(),
  }),
};

const params = {
  params: object({
    itemId: string({
      required_error: "Item ID is required",
    }),
  }),
};

const getItemsParams = {
  params: object({
    listId: string({
      required_error: "List ID is required",
    }),
  }),
};

export const createItemSchema = object({ ...payload });

export const getItemsSchema = object({ ...getItemsParams });

export const getItemSchema = object({ ...params });

export const updateItemSchema = object({ ...payload, ...params });

export const patchItemSchema = object({ ...patchPayload, ...params });

export const deleteItemSchema = object({ ...params });

export type CreateItemInput = TypeOf<typeof createItemSchema>;
export type GetItemsInput = TypeOf<typeof getItemsSchema>;
export type GetItemInput = TypeOf<typeof getItemSchema>;
export type UpdateItemInput = TypeOf<typeof updateItemSchema>;
export type PatchItemInput = TypeOf<typeof patchItemSchema>;
export type DeleteItemInput = TypeOf<typeof deleteItemSchema>;
