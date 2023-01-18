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
exports.clearItems = exports.deleteItem = exports.findAndUpdateItem = exports.findAndReplaceItem = exports.findItem = exports.findItems = exports.createItem = void 0;
const item_model_1 = __importDefault(require("../model/item.model"));
const createItem = (input) => __awaiter(void 0, void 0, void 0, function* () {
    return item_model_1.default.create(input);
});
exports.createItem = createItem;
const findItems = (query, options = { lean: true }) => __awaiter(void 0, void 0, void 0, function* () {
    return item_model_1.default.find(query, {}, options);
});
exports.findItems = findItems;
const findItem = (query, options = { lean: true }) => __awaiter(void 0, void 0, void 0, function* () {
    return item_model_1.default.findOne(query, {}, options);
});
exports.findItem = findItem;
const findAndReplaceItem = (query, update, options) => __awaiter(void 0, void 0, void 0, function* () {
    return item_model_1.default.findOneAndReplace(query, update, options);
});
exports.findAndReplaceItem = findAndReplaceItem;
const findAndUpdateItem = (query, update, options) => __awaiter(void 0, void 0, void 0, function* () {
    return item_model_1.default.findOneAndUpdate(query, update, options);
});
exports.findAndUpdateItem = findAndUpdateItem;
const deleteItem = (query) => __awaiter(void 0, void 0, void 0, function* () {
    item_model_1.default.deleteMany({ itemId: query._id });
    return item_model_1.default.deleteOne(query);
});
exports.deleteItem = deleteItem;
const clearItems = () => __awaiter(void 0, void 0, void 0, function* () {
    item_model_1.default.deleteMany();
    return item_model_1.default.deleteMany();
});
exports.clearItems = clearItems;
