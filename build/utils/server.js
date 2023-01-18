"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = __importDefault(require("../routes"));
const error_middleware_1 = require("../middleware/error.middleware");
const notFound_middleware_1 = require("../middleware/notFound.middleware");
const deserializeUser_middleware_1 = require("../middleware/deserializeUser.middleware");
const createServer = () => {
    const app = (0, express_1.default)();
    app.use((0, helmet_1.default)());
    app.use((0, cors_1.default)({ credentials: true, origin: "http://localhost:3000" }));
    app.use(express_1.default.json());
    app.use((0, cookie_parser_1.default)());
    app.use(deserializeUser_middleware_1.deserializeUser);
    (0, routes_1.default)(app);
    app.use(error_middleware_1.errorHandler);
    app.use(notFound_middleware_1.notFoundHandler);
    return app;
};
exports.default = createServer;
