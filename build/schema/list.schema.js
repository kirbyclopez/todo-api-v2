"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteListSchema = exports.updateListSchema = exports.createListSchema = exports.getListSchema = void 0;
const zod_1 = require("zod");
const payload = {
    body: (0, zod_1.object)({
        name: (0, zod_1.string)({
            required_error: "Name is required",
        }),
    }),
};
const params = {
    params: (0, zod_1.object)({
        listId: (0, zod_1.string)({
            required_error: "List ID is required",
        }),
    }),
};
exports.getListSchema = (0, zod_1.object)(Object.assign({}, params));
exports.createListSchema = (0, zod_1.object)(Object.assign({}, payload));
exports.updateListSchema = (0, zod_1.object)(Object.assign(Object.assign({}, payload), params));
exports.deleteListSchema = (0, zod_1.object)(Object.assign({}, params));
