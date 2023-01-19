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
exports.deleteSessionHandler = exports.getUserSessionsHandler = exports.createUserSessionHandler = void 0;
const session_service_1 = require("../service/session.service");
const user_service_1 = require("../service/user.service");
const jwt_utils_1 = require("../utils/jwt.utils");
const cookie_config_1 = __importDefault(require("../utils/cookie-config"));
const createUserSessionHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, user_service_1.validatePassword)(req.body);
    if (!user)
        return res.status(401).send({ message: "Invalid username or password" });
    const session = yield (0, session_service_1.createSession)(user._id, req.get("user-agent") || "");
    const accessToken = (0, jwt_utils_1.signJwt)({
        uid: user._id,
        name: user.name,
        username: user.username,
        sid: session._id,
    }, { expiresIn: process.env.ACCESSTOKENTTL });
    const refreshToken = (0, jwt_utils_1.signJwt)({
        uid: user._id,
        name: user.name,
        username: user.username,
        sid: session._id,
    }, { expiresIn: process.env.REFRESHTOKENTTL });
    res.cookie("accessToken", accessToken, cookie_config_1.default);
    res.cookie("refreshToken", refreshToken, cookie_config_1.default);
    return res.send({ accessToken, refreshToken });
});
exports.createUserSessionHandler = createUserSessionHandler;
const getUserSessionsHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = res.locals.user.uid;
    const sessions = yield (0, session_service_1.findSessions)({ user: userId, valid: true });
    return res.send(sessions);
});
exports.getUserSessionsHandler = getUserSessionsHandler;
const deleteSessionHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const sessionId = res.locals.user.sid;
    yield (0, session_service_1.updateSession)({ _id: sessionId }, { valid: false });
    res.clearCookie("accessToken").clearCookie("refreshToken");
    return res.send({
        accessToken: null,
        refreshToken: null,
    });
});
exports.deleteSessionHandler = deleteSessionHandler;
