"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controller/user.controller");
const validateResource_middleware_1 = __importDefault(require("../middleware/validateResource.middleware"));
const user_schema_1 = require("../schema/user.schema");
exports.userRouter = express_1.default.Router();
// User Registration
exports.userRouter.post("/", (0, validateResource_middleware_1.default)(user_schema_1.createUserSchema), user_controller_1.createUserHandler);
