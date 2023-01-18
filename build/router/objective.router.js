"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectiveRouter = void 0;
const express_1 = __importDefault(require("express"));
const objective_controller_1 = require("../controller/objective.controller");
const requireUser_middleware_1 = __importDefault(require("../middleware/requireUser.middleware"));
const validateResource_middleware_1 = __importDefault(require("../middleware/validateResource.middleware"));
const objective_schema_1 = require("../schema/objective.schema");
exports.objectiveRouter = express_1.default.Router();
exports.objectiveRouter.get("/", requireUser_middleware_1.default, objective_controller_1.getObjectivesHandler);
exports.objectiveRouter.get("/:objectiveId", requireUser_middleware_1.default, (0, validateResource_middleware_1.default)(objective_schema_1.getObjectiveSchema), objective_controller_1.getObjectiveHandler);
exports.objectiveRouter.post("/", requireUser_middleware_1.default, (0, validateResource_middleware_1.default)(objective_schema_1.createObjectiveSchema), objective_controller_1.createObjectiveHandler);
exports.objectiveRouter.put("/:objectiveId", requireUser_middleware_1.default, (0, validateResource_middleware_1.default)(objective_schema_1.updateObjectiveSchema), objective_controller_1.updateObjectiveHandler);
exports.objectiveRouter.patch("/:objectiveId", requireUser_middleware_1.default, (0, validateResource_middleware_1.default)(objective_schema_1.patchObjectiveSchema), objective_controller_1.patchObjectiveHandler);
exports.objectiveRouter.delete("/:objectiveId", requireUser_middleware_1.default, (0, validateResource_middleware_1.default)(objective_schema_1.deleteObjectiveSchema), objective_controller_1.deleteObjectiveHandler);
