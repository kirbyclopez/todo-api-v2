"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listRouter = void 0;
const express_1 = __importDefault(require("express"));
const list_controller_1 = require("../controller/list.controller");
const requireUser_middleware_1 = __importDefault(require("../middleware/requireUser.middleware"));
const validateResource_middleware_1 = __importDefault(require("../middleware/validateResource.middleware"));
const list_schema_1 = require("../schema/list.schema");
const item_schema_1 = require("../schema/item.schema");
const item_controller_1 = require("../controller/item.controller");
exports.listRouter = express_1.default.Router();
exports.listRouter.get("/", requireUser_middleware_1.default, list_controller_1.getListsHandler);
exports.listRouter.get("/:listId", requireUser_middleware_1.default, (0, validateResource_middleware_1.default)(list_schema_1.getListSchema), list_controller_1.getListHandler);
exports.listRouter.post("/", requireUser_middleware_1.default, (0, validateResource_middleware_1.default)(list_schema_1.createListSchema), list_controller_1.createListHandler);
exports.listRouter.put("/:listId", requireUser_middleware_1.default, (0, validateResource_middleware_1.default)(list_schema_1.updateListSchema), list_controller_1.updateListHandler);
exports.listRouter.delete("/:listId", requireUser_middleware_1.default, (0, validateResource_middleware_1.default)(list_schema_1.deleteListSchema), list_controller_1.deleteListHandler);
// For getting items in a list
exports.listRouter.get("/:listId/items", requireUser_middleware_1.default, (0, validateResource_middleware_1.default)(item_schema_1.getItemsSchema), item_controller_1.getItemsHandler);
