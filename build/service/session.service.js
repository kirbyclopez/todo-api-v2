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
exports.clearSessions = exports.reIssueAccessToken = exports.updateSession = exports.findSessions = exports.createSession = void 0;
const lodash_1 = require("lodash");
const session_model_1 = __importDefault(require("../model/session.model"));
const jwt_utils_1 = require("../utils/jwt.utils");
const user_service_1 = require("./user.service");
const createSession = (userId, userAgent) => __awaiter(void 0, void 0, void 0, function* () {
    const session = yield session_model_1.default.create({ user: userId, userAgent });
    return session.toJSON();
});
exports.createSession = createSession;
const findSessions = (query) => __awaiter(void 0, void 0, void 0, function* () {
    return session_model_1.default.find(query).lean();
});
exports.findSessions = findSessions;
const updateSession = (query, update) => __awaiter(void 0, void 0, void 0, function* () {
    return session_model_1.default.updateOne(query, update);
});
exports.updateSession = updateSession;
const reIssueAccessToken = ({ refreshToken, }) => __awaiter(void 0, void 0, void 0, function* () {
    const { decoded } = (0, jwt_utils_1.verifyJwt)(refreshToken);
    if (!decoded || !(0, lodash_1.get)(decoded, "sid"))
        return false;
    const session = yield session_model_1.default.findById((0, lodash_1.get)(decoded, "sid"));
    if (!session || !session.valid)
        return false;
    const user = yield (0, user_service_1.findUser)({ _id: session.user });
    if (!user)
        return false;
    const accessToken = (0, jwt_utils_1.signJwt)({
        uid: user._id,
        name: user.name,
        username: user.username,
        sid: session._id,
    }, { expiresIn: process.env.ACCESSTOKENTTL });
    return accessToken;
});
exports.reIssueAccessToken = reIssueAccessToken;
const clearSessions = () => __awaiter(void 0, void 0, void 0, function* () {
    return session_model_1.default.deleteMany();
});
exports.clearSessions = clearSessions;
