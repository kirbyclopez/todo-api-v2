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
exports.deleteObjective = exports.findAndUpdateObjective = exports.findAndReplaceObjective = exports.findObjective = exports.findObjectives = exports.createObjective = void 0;
const objective_model_1 = __importDefault(require("../model/objective.model"));
const createObjective = (input) => __awaiter(void 0, void 0, void 0, function* () {
    return objective_model_1.default.create(input);
});
exports.createObjective = createObjective;
const findObjectives = (query, options = { lean: true }) => __awaiter(void 0, void 0, void 0, function* () {
    return objective_model_1.default.find(query, {}, options);
});
exports.findObjectives = findObjectives;
const findObjective = (query, options = { lean: true }) => __awaiter(void 0, void 0, void 0, function* () {
    return objective_model_1.default.findOne(query, {}, options);
});
exports.findObjective = findObjective;
const findAndReplaceObjective = (query, update, options) => __awaiter(void 0, void 0, void 0, function* () {
    return objective_model_1.default.findOneAndReplace(query, update, options);
});
exports.findAndReplaceObjective = findAndReplaceObjective;
const findAndUpdateObjective = (query, update, options) => __awaiter(void 0, void 0, void 0, function* () {
    return objective_model_1.default.findOneAndUpdate(query, update, options);
});
exports.findAndUpdateObjective = findAndUpdateObjective;
const deleteObjective = (query) => __awaiter(void 0, void 0, void 0, function* () {
    return objective_model_1.default.deleteOne(query);
});
exports.deleteObjective = deleteObjective;
