"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteObjectiveSchema = exports.patchObjectiveSchema = exports.updateObjectiveSchema = exports.createObjectiveSchema = exports.getObjectiveSchema = void 0;
const zod_1 = require("zod");
const payload = {
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: "Name is required",
        }),
        description: (0, zod_1.string)({
            required_error: "Description is required",
        }),
        reason: (0, zod_1.string)({
            required_error: "Reason is required",
        }),
        targetDate: (0, zod_1.preprocess)((arg) => {
            if (typeof arg == "string" || arg instanceof Date)
                return new Date(arg);
        }, (0, zod_1.date)({
            required_error: "Target date is required",
            invalid_type_error: "Date entered is invalid",
        })),
        completedDate: (0, zod_1.preprocess)((arg) => {
            if (typeof arg == "string" || arg instanceof Date)
                return new Date(arg);
        }, (0, zod_1.date)({
            invalid_type_error: "Date entered is invalid",
        }).optional()),
    }),
};
const patchPayload = {
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: "Name is required",
        }).optional(),
        description: (0, zod_1.string)({
            required_error: "Description is required",
        }).optional(),
        reason: (0, zod_1.string)({
            required_error: "Reason is required",
        }).optional(),
        targetDate: (0, zod_1.preprocess)((arg) => {
            if (typeof arg == "string" || arg instanceof Date)
                return new Date(arg);
        }, (0, zod_1.date)({
            required_error: "Target date is required",
            invalid_type_error: "Date entered is invalid",
        }).optional()),
        completedDate: (0, zod_1.preprocess)((arg) => {
            if (typeof arg == "string" || arg instanceof Date)
                return new Date(arg);
        }, (0, zod_1.date)({
            invalid_type_error: "Date entered is invalid",
        }).optional()),
    }),
};
const params = {
    params: (0, zod_1.object)({
        objectiveId: (0, zod_1.string)({
            required_error: "Objective ID is required",
        }),
    }),
};
exports.getObjectiveSchema = (0, zod_1.object)(Object.assign({}, params));
exports.createObjectiveSchema = (0, zod_1.object)(Object.assign({}, payload));
exports.updateObjectiveSchema = (0, zod_1.object)(Object.assign(Object.assign({}, payload), params));
exports.patchObjectiveSchema = (0, zod_1.object)(Object.assign(Object.assign({}, patchPayload), params));
exports.deleteObjectiveSchema = (0, zod_1.object)(Object.assign({}, params));
