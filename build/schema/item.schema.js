"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteItemSchema = exports.patchItemSchema = exports.updateItemSchema = exports.getItemSchema = exports.getItemsSchema = exports.createItemSchema = void 0;
const zod_1 = require("zod");
const payload = {
    body: (0, zod_1.object)({
        listId: (0, zod_1.string)({
            required_error: "List ID is required",
        }),
        name: (0, zod_1.string)({
            required_error: "Name is required",
        }),
        isComplete: (0, zod_1.boolean)().optional(),
    }),
};
const patchPayload = {
    body: (0, zod_1.object)({
        listId: (0, zod_1.string)().optional(),
        name: (0, zod_1.string)().optional(),
        isComplete: (0, zod_1.boolean)().optional(),
    }),
};
const params = {
    params: (0, zod_1.object)({
        itemId: (0, zod_1.string)({
            required_error: "Item ID is required",
        }),
    }),
};
const getItemsParams = {
    params: (0, zod_1.object)({
        listId: (0, zod_1.string)({
            required_error: "List ID is required",
        }),
    }),
};
exports.createItemSchema = (0, zod_1.object)(Object.assign({}, payload));
exports.getItemsSchema = (0, zod_1.object)(Object.assign({}, getItemsParams));
exports.getItemSchema = (0, zod_1.object)(Object.assign({}, params));
exports.updateItemSchema = (0, zod_1.object)(Object.assign(Object.assign({}, payload), params));
exports.patchItemSchema = (0, zod_1.object)(Object.assign(Object.assign({}, patchPayload), params));
exports.deleteItemSchema = (0, zod_1.object)(Object.assign({}, params));
