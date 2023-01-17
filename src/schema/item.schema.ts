import { boolean, object, string, TypeOf } from "zod";

const payload = {
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    isComplete: boolean({
      required_error: "Is complete tag is required",
    }),
  }),
};

const params = {
  params: object({
    listId: string({
      required_error: "List ID is required",
    }),
    name: string({
      required_error: "Item name is required",
    }),
  }),
};

export const createItemSchema = object({ ...payload });

export const updateItemSchema = object({ ...payload, ...params });

export const deleteItemSchema = object({ ...params });

export type CreateItemInput = TypeOf<typeof createItemSchema>;
export type UpdateItemInput = TypeOf<typeof updateItemSchema>;
export type DeleteItemInput = TypeOf<typeof deleteItemSchema>;
