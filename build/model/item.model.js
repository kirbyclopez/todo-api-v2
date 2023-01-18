"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ItemSchema = new mongoose_1.default.Schema({
    listId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        required: true,
        ref: "List",
    },
    name: { type: String, required: true },
    isComplete: { type: Boolean, default: false },
}, { timestamps: true, versionKey: false });
const ItemModel = mongoose_1.default.model("Item", ItemSchema);
exports.default = ItemModel;
