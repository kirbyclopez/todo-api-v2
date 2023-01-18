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
exports.clearLists = exports.deleteList = exports.findAndReplaceList = exports.findList = exports.findLists = exports.createList = void 0;
const list_model_1 = __importDefault(require("../model/list.model"));
const item_model_1 = __importDefault(require("../model/item.model"));
const createList = (input) => __awaiter(void 0, void 0, void 0, function* () {
    return list_model_1.default.create(input);
});
exports.createList = createList;
const findLists = (query, options = { lean: true }) => __awaiter(void 0, void 0, void 0, function* () {
    return list_model_1.default.find(query, {}, options);
});
exports.findLists = findLists;
const findList = (query, options = { lean: true }) => __awaiter(void 0, void 0, void 0, function* () {
    return list_model_1.default.findOne(query, {}, options);
});
exports.findList = findList;
const findAndReplaceList = (query, update, options) => __awaiter(void 0, void 0, void 0, function* () {
    return list_model_1.default.findOneAndReplace(query, update, options);
});
exports.findAndReplaceList = findAndReplaceList;
const deleteList = (query) => __awaiter(void 0, void 0, void 0, function* () {
    item_model_1.default.deleteMany({ listId: query._id });
    return list_model_1.default.deleteOne(query);
});
exports.deleteList = deleteList;
const clearLists = () => __awaiter(void 0, void 0, void 0, function* () {
    item_model_1.default.deleteMany();
    return list_model_1.default.deleteMany();
});
exports.clearLists = clearLists;
