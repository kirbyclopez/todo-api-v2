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
exports.deleteListHandler = exports.updateListHandler = exports.getListHandler = exports.getListsHandler = exports.createListHandler = void 0;
const list_service_1 = require("../service/list.service");
const logger_1 = __importDefault(require("../utils/logger"));
const createListHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = res.locals.user.uid;
        const list = yield (0, list_service_1.createList)(Object.assign(Object.assign({}, req.body), { userId }));
        return res.status(201).send(list);
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send({ message: e.message });
    }
});
exports.createListHandler = createListHandler;
const getListsHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = res.locals.user.uid;
    const lists = yield (0, list_service_1.findLists)({ userId });
    return res.send(lists);
});
exports.getListsHandler = getListsHandler;
const getListHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = res.locals.user.uid;
    const listId = req.params.listId;
    const list = yield (0, list_service_1.findList)({ _id: listId, userId });
    if (!list)
        return res.status(404).send({ message: "Resource not found" });
    return res.send(list);
});
exports.getListHandler = getListHandler;
const updateListHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = res.locals.user.uid;
    const listId = req.params.listId;
    const update = req.body;
    update.userId = userId;
    const list = yield (0, list_service_1.findList)({ _id: listId, userId });
    if (!list)
        return res.status(404).send({ message: "Resource not found" });
    const updatedList = yield (0, list_service_1.findAndReplaceList)({ _id: listId }, update, {
        new: true,
    });
    return res.send(updatedList);
});
exports.updateListHandler = updateListHandler;
const deleteListHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = res.locals.user.uid;
    const listId = req.params.listId;
    const list = yield (0, list_service_1.findList)({ _id: listId, userId });
    if (!list)
        return res.status(404).send({ message: "Resource not found" });
    yield (0, list_service_1.deleteList)({ _id: listId });
    return res.status(200).send({ message: "List was successfully deleted." });
});
exports.deleteListHandler = deleteListHandler;
