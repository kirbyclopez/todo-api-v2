"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const objectiveSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    reason: { type: String, required: true },
    targetDate: { type: Date, required: true },
    completedDate: { type: Date },
}, { timestamps: true });
const ObjectiveModel = mongoose_1.default.model("Objective", objectiveSchema);
exports.default = ObjectiveModel;
