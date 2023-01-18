"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.itemRouter = void 0;
const express_1 = __importDefault(require("express"));
const item_controller_1 = require("../controller/item.controller");
const requireUser_middleware_1 = __importDefault(require("../middleware/requireUser.middleware"));
const validateResource_middleware_1 = __importDefault(require("../middleware/validateResource.middleware"));
const item_schema_1 = require("../schema/item.schema");
exports.itemRouter = express_1.default.Router();
exports.itemRouter.get("/:itemId", requireUser_middleware_1.default, (0, validateResource_middleware_1.default)(item_schema_1.getItemSchema), item_controller_1.getItemHandler);
exports.itemRouter.post("/", requireUser_middleware_1.default, (0, validateResource_middleware_1.default)(item_schema_1.createItemSchema), item_controller_1.createItemHandler);
exports.itemRouter.put("/:itemId", requireUser_middleware_1.default, (0, validateResource_middleware_1.default)(item_schema_1.updateItemSchema), item_controller_1.updateItemHandler);
exports.itemRouter.patch("/:itemId", requireUser_middleware_1.default, (0, validateResource_middleware_1.default)(item_schema_1.patchItemSchema), item_controller_1.patchItemHandler);
exports.itemRouter.delete("/:itemId", requireUser_middleware_1.default, (0, validateResource_middleware_1.default)(item_schema_1.deleteItemSchema), item_controller_1.deleteItemHandler);
