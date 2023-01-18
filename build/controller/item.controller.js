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
exports.deleteItemHandler = exports.patchItemHandler = exports.updateItemHandler = exports.getItemHandler = exports.getItemsHandler = exports.createItemHandler = void 0;
const item_service_1 = require("../service/item.service");
const logger_1 = __importDefault(require("../utils/logger"));
const list_service_1 = require("../service/list.service");
const createItemHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = res.locals.user.uid;
        const list = yield (0, list_service_1.findList)({ _id: req.body.listId, userId });
        if (!list)
            return res.status(404).send({ message: "Resource not found" });
        const item = yield (0, item_service_1.createItem)(req.body);
        return res.status(201).send(item);
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send({ message: e.message });
    }
});
exports.createItemHandler = createItemHandler;
const getItemsHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = res.locals.user.uid;
    const list = yield (0, list_service_1.findList)({ _id: req.params.listId, userId });
    if (!list)
        return res.status(404).send({ message: "Resource not found" });
    const items = yield (0, item_service_1.findItems)({ listId: req.params.listId });
    return res.send(items);
});
exports.getItemsHandler = getItemsHandler;
const getItemHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = res.locals.user.uid;
    const itemId = req.params.itemId;
    const item = yield (0, item_service_1.findItem)({ _id: itemId });
    if (!item)
        return res.status(404).send({ message: "Resource not found" });
    const list = yield (0, list_service_1.findList)({ _id: item.listId, userId });
    if (!list)
        return res.status(404).send({ message: "Resource not found" });
    return res.send(item);
});
exports.getItemHandler = getItemHandler;
const updateItemHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = res.locals.user.uid;
    const itemId = req.params.itemId;
    const update = req.body;
    const item = yield (0, item_service_1.findItem)({ _id: itemId });
    if (!item)
        return res.status(404).send({ message: "Resource not found" });
    const list = yield (0, list_service_1.findList)({ _id: item.listId, userId });
    if (!list)
        return res.status(404).send({ message: "Resource not found" });
    const updatedItem = yield (0, item_service_1.findAndReplaceItem)({ _id: itemId }, update, {
        new: true,
    });
    return res.send(updatedItem);
});
exports.updateItemHandler = updateItemHandler;
const patchItemHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = res.locals.user.uid;
    const itemId = req.params.itemId;
    const update = req.body;
    const item = yield (0, item_service_1.findItem)({ _id: itemId });
    if (!item)
        return res.status(404).send({ message: "Resource not found" });
    const list = yield (0, list_service_1.findList)({ _id: item.listId, userId });
    if (!list)
        return res.status(404).send({ message: "Resource not found" });
    const updatedItem = yield (0, item_service_1.findAndUpdateItem)({ _id: itemId }, update, {
        new: true,
    });
    return res.send(updatedItem);
});
exports.patchItemHandler = patchItemHandler;
const deleteItemHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = res.locals.user.uid;
    const itemId = req.params.itemId;
    const item = yield (0, item_service_1.findItem)({ _id: itemId });
    if (!item)
        return res.status(404).send({ message: "Resource not found" });
    const list = yield (0, list_service_1.findList)({ _id: item.listId, userId });
    if (!list)
        return res.status(404).send({ message: "Resource not found" });
    yield (0, item_service_1.deleteItem)({ _id: itemId });
    return res.status(200).send({ message: "Item was successfully deleted." });
});
exports.deleteItemHandler = deleteItemHandler;
