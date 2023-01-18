"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionRouter = void 0;
const express_1 = __importDefault(require("express"));
const session_controller_1 = require("../controller/session.controller");
const requireUser_middleware_1 = __importDefault(require("../middleware/requireUser.middleware"));
const validateResource_middleware_1 = __importDefault(require("../middleware/validateResource.middleware"));
const session_schema_1 = require("../schema/session.schema");
exports.sessionRouter = express_1.default.Router();
// User Login
exports.sessionRouter.post("/login", (0, validateResource_middleware_1.default)(session_schema_1.createSessionSchema), session_controller_1.createUserSessionHandler);
// Get Active Sessions
exports.sessionRouter.get("/sessions", requireUser_middleware_1.default, session_controller_1.getUserSessionsHandler);
// Delete Session
exports.sessionRouter.delete("/sessions", requireUser_middleware_1.default, session_controller_1.deleteSessionHandler);
