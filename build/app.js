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
if (process.env.NODE_ENV !== "production") {
    const dotenv = require("dotenv");
    const envFile = process.env.NODE_ENV
        ? `.env.${process.env.NODE_ENV}`
        : ".env";
    dotenv.config({ path: envFile });
}
const connect_1 = __importDefault(require("./utils/connect"));
const logger_1 = __importDefault(require("./utils/logger"));
const server_1 = __importDefault(require("./utils/server"));
const host = process.env.HOST || "localhost";
const port = process.env.PORT || 5000;
const app = (0, server_1.default)();
app.listen(port, () => __awaiter(void 0, void 0, void 0, function* () {
    logger_1.default.info(`Server is listening at http://${host}:${port}/...`);
    yield (0, connect_1.default)();
}));
