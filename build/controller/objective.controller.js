"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteObjectiveHandler = exports.patchObjectiveHandler = exports.updateObjectiveHandler = exports.getObjectiveHandler = exports.getObjectivesHandler = exports.createObjectiveHandler = void 0;
const objective_service_1 = require("../service/objective.service");
const logger_1 = __importDefault(require("../utils/logger"));
const createObjectiveHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const objective = yield (0, objective_service_1.createObjective)(req.body);
        return res.send(objective);
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send(e.message);
    }
});
exports.createObjectiveHandler = createObjectiveHandler;
const getObjectivesHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const objectives = yield (0, objective_service_1.findObjectives)({});
    return res.send(objectives);
});
exports.getObjectivesHandler = getObjectivesHandler;
const getObjectiveHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const objectiveId = req.params.objectiveId;
    const objective = yield (0, objective_service_1.findObjective)({ _id: objectiveId });
    if (!objective)
        return res.status(404).send("Resource not found");
    return res.send(objective);
});
exports.getObjectiveHandler = getObjectiveHandler;
const updateObjectiveHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const objectiveId = req.params.objectiveId;
    const update = req.body;
    const objective = yield (0, objective_service_1.findObjective)({ _id: objectiveId });
    if (!objective)
        return res.status(404).send("Resource not found");
    const updatedObjective = yield (0, objective_service_1.findAndReplaceObjective)({ _id: objectiveId }, update, { new: true });
    return res.send(updatedObjective);
});
exports.updateObjectiveHandler = updateObjectiveHandler;
const patchObjectiveHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const objectiveId = req.params.objectiveId;
    const update = req.body;
    const objective = yield (0, objective_service_1.findObjective)({ _id: objectiveId });
    if (!objective)
        return res.status(404).send("Resource not found");
    const updatedObjective = yield (0, objective_service_1.findAndUpdateObjective)({ _id: objectiveId }, update, { new: true });
    return res.send(updatedObjective);
});
exports.patchObjectiveHandler = patchObjectiveHandler;
const deleteObjectiveHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const objectiveId = req.params.objectiveId;
    const objective = yield (0, objective_service_1.findObjective)({ _id: objectiveId });
    if (!objective)
        return res.status(404).send("Resource not found");
    console.log(objective);
    yield (0, objective_service_1.deleteObjective)({ _id: objectiveId });
    return res.status(200).send("Objective was successfully deleted.");
});
exports.deleteObjectiveHandler = deleteObjectiveHandler;
