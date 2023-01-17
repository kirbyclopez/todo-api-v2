import { object, string, TypeOf } from "zod";

const payload = {
  body: object({
    name: string({
      required_error: "Name is required",
    }),
  }),
};

const params = {
  params: object({
    listId: string({
      required_error: "List ID is required",
    }),
  }),
};

export const getListSchema = object({ ...params });

export const createListSchema = object({ ...payload });

export const updateListSchema = object({ ...payload, ...params });

export const deleteListSchema = object({ ...params });

export type CreateListInput = TypeOf<typeof createListSchema>;
export type UpdateListInput = TypeOf<typeof updateListSchema>;
export type GetListInput = TypeOf<typeof getListSchema>;
export type DeleteListInput = TypeOf<typeof deleteListSchema>;
