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
exports.createUserHandler = void 0;
const user_service_1 = require("../service/user.service");
const logger_1 = __importDefault(require("../utils/logger"));
const session_service_1 = require("../service/session.service");
const jwt_utils_1 = require("../utils/jwt.utils");
const cookie_config_1 = __importDefault(require("../utils/cookie-config"));
const createUserHandler = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield (0, user_service_1.createUser)(req.body);
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
        return res.status(201).send({ accessToken, refreshToken });
    }
    catch (e) {
        logger_1.default.error(e);
        return res.status(409).send({ message: e.message });
    }
});
exports.createUserHandler = createUserHandler;
