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
const app = (0, server_1.default)();
const userId = new mongoose_1.default.Types.ObjectId().toString();
const userPayload = {
    _id: userId,
    username: "user1",
    name: "New User 1",
    password: "Password1",
    passwordConfirmation: "Password1",
};
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    const dbUri = process.env.DBURI;
    yield mongoose_1.default.connect(dbUri);
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    // Clean users collection
    yield (0, user_service_1.clearUsers)();
    yield mongoose_1.default.disconnect();
    yield mongoose_1.default.connection.close();
}));
describe("User resource test suite", () => {
    describe("POST /api/register tests", () => {
        describe("given the user fields are complete", () => {
            it("should return status 201 and create a user", () => __awaiter(void 0, void 0, void 0, function* () {
                const result = yield (0, supertest_1.default)(app)
                    .post("/api/register")
                    .send(userPayload);
                expect(result.statusCode).toBe(201);
                expect(result.body.accessToken).toBeTruthy();
                expect(result.body.refreshToken).toBeTruthy();
            }));
        });
    });
});
