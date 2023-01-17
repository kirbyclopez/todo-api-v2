import { object, string, date, TypeOf, preprocess } from "zod";

const payload = {
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    description: string({
      required_error: "Description is required",
    }),
    reason: string({
      required_error: "Reason is required",
    }),
    targetDate: preprocess(
      (arg) => {
        if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
      },
      date({
        required_error: "Target date is required",
        invalid_type_error: "Date entered is invalid",
      })
    ),
    completedDate: preprocess(
      (arg) => {
        if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
      },
      date({
        invalid_type_error: "Date entered is invalid",
      }).optional()
    ),
  }),
};

const patchPayload = {
  body: object({
    name: string({
      required_error: "Name is required",
    }).optional(),
    description: string({
      required_error: "Description is required",
    }).optional(),
    reason: string({
      required_error: "Reason is required",
    }).optional(),
    targetDate: preprocess(
      (arg) => {
        if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
      },
      date({
        required_error: "Target date is required",
        invalid_type_error: "Date entered is invalid",
      }).optional()
    ),
    completedDate: preprocess(
      (arg) => {
        if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
      },
      date({
        invalid_type_error: "Date entered is invalid",
      }).optional()
    ),
  }),
};

const params = {
  params: object({
    objectiveId: string({
      required_error: "Objective ID is required",
    }),
  }),
};

export const getObjectiveSchema = object({ ...params });

export const createObjectiveSchema = object({ ...payload });

export const updateObjectiveSchema = object({ ...payload, ...params });

export const patchObjectiveSchema = object({ ...patchPayload, ...params });

export const deleteObjectiveSchema = object({ ...params });

export type CreateObjectiveInput = TypeOf<typeof createObjectiveSchema>;
export type UpdateObjectiveInput = TypeOf<typeof updateObjectiveSchema>;
export type PatchObjectiveInput = TypeOf<typeof patchObjectiveSchema>;
export type GetObjectiveInput = TypeOf<typeof getObjectiveSchema>;
export type DeleteObjectiveInput = TypeOf<typeof deleteObjectiveSchema>;
