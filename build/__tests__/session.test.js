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
require("dotenv").config({ path: ".env.test" });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../utils/server"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_service_1 = require("../service/user.service");
const session_service_1 = require("../service/session.service");
const app = (0, server_1.default)();
let authCookie = new Array(0).fill("");
const userPayload = {
    username: "user1",
    name: "New User 1",
    password: "Password1",
    passwordConfirmation: "Password1",
};
const validUserPayload = {
    username: "user1",
    password: "Password1",
};
const invalidUserPayload = {
    username: "user2",
    password: "Password2",
};
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    const dbUri = process.env.DBURI;
    yield mongoose_1.default.connect(dbUri);
    // Create user
    yield (0, supertest_1.default)(app).post("/api/register").send(userPayload);
    // Clear sessions collection
    yield (0, session_service_1.clearSessions)();
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    // Clear sessions
    yield (0, session_service_1.clearSessions)();
    // Clear users
    yield (0, user_service_1.clearUsers)();
    yield mongoose_1.default.disconnect();
    yield mongoose_1.default.connection.close();
}));
describe("Session resource test suite", () => {
    describe("POST /api/auth/login tests", () => {
        describe("given the credential provided is invalid", () => {
            it("should return a 401 and message", () => __awaiter(void 0, void 0, void 0, function* () {
                const result = yield (0, supertest_1.default)(app)
                    .post("/api/auth/login")
                    .send(invalidUserPayload);
                expect(result.statusCode).toBe(401);
                expect(result.body.message).toBe("Invalid username or password");
            }));
        });
        describe("given the credential provided is valid", () => {
            it("should return status 200 and tokens", () => __awaiter(void 0, void 0, void 0, function* () {
                const result = yield (0, supertest_1.default)(app)
                    .post("/api/auth/login")
                    .send(validUserPayload);
                expect(result.statusCode).toBe(200);
                expect(result.body.accessToken).toBeTruthy();
                expect(result.body.refreshToken).toBeTruthy();
                authCookie = result.headers["set-cookie"];
            }));
        });
    });
    describe("GET /api/auth/sessions tests", () => {
        describe("given the token is not provided", () => {
            it("should return a 403", () => __awaiter(void 0, void 0, void 0, function* () {
                const result = yield (0, supertest_1.default)(app).get("/api/auth/sessions");
                expect(result.statusCode).toBe(403);
            }));
        });
        describe("given the token is provided", () => {
            it("should return a 200 and all active sessions", () => __awaiter(void 0, void 0, void 0, function* () {
                const result = yield (0, supertest_1.default)(app)
                    .get("/api/auth/sessions")
                    .set("Cookie", authCookie);
                expect(result.statusCode).toBe(200);
                expect(result.body.length).toBeGreaterThan(0);
            }));
        });
    });
});
