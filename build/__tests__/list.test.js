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
const list_service_1 = require("../service/list.service");
const user_service_1 = require("../service/user.service");
const session_service_1 = require("../service/session.service");
const app = (0, server_1.default)();
let authCookie = new Array(0).fill("");
const userId = new mongoose_1.default.Types.ObjectId().toString();
const userPayload = {
    username: "user1",
    name: "New User 1",
    password: "Password1",
    passwordConfirmation: "Password1",
};
const listId = new mongoose_1.default.Types.ObjectId().toString();
const dummyListId = "6396da7d01dd1102052c6f51";
const listPayload = {
    _id: listId,
    name: "List 1",
};
const updateListPayload = {
    name: "List 2",
};
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    const dbUri = process.env.DBURI;
    yield mongoose_1.default.connect(dbUri);
    // Create user
    yield (0, supertest_1.default)(app).post("/api/register").send(userPayload);
    // Login to get access token
    const response = yield (0, supertest_1.default)(app).post("/api/auth/login").send({
        username: "user1",
        password: "Password1",
    });
    authCookie = response.headers["set-cookie"];
    // Clear lists collection
    yield (0, list_service_1.clearLists)();
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    // Clear lists
    yield (0, list_service_1.clearLists)();
    // Clear sessions collection
    yield (0, session_service_1.clearSessions)();
    // Clear users
    yield (0, user_service_1.clearUsers)();
    yield mongoose_1.default.disconnect();
    yield mongoose_1.default.connection.close();
}));
describe("List resource test suite", () => {
    describe("POST /api/lists tests", () => {
        describe("given the token is not provided", () => {
            it("should return a 403", () => __awaiter(void 0, void 0, void 0, function* () {
                const result = yield (0, supertest_1.default)(app).post("/api/lists").send(listPayload);
                expect(result.statusCode).toBe(403);
            }));
        });
        describe("given the list fields are complete", () => {
            it("should return status 201 and create an list", () => __awaiter(void 0, void 0, void 0, function* () {
                const result = yield (0, supertest_1.default)(app)
                    .post("/api/lists")
                    .set("Cookie", authCookie)
                    .send(listPayload);
                expect(result.statusCode).toBe(201);
                expect(result.body.name).toBe("List 1");
            }));
        });
    });
    describe("GET /api/lists tests", () => {
        describe("given the token is not provided", () => {
            it("should return a 403", () => __awaiter(void 0, void 0, void 0, function* () {
                const result = yield (0, supertest_1.default)(app).get("/api/lists");
                expect(result.statusCode).toBe(403);
            }));
        });
        describe("given the token is provided", () => {
            it("should return status 200 and all lists", () => __awaiter(void 0, void 0, void 0, function* () {
                const result = yield (0, supertest_1.default)(app)
                    .get("/api/lists")
                    .set("Cookie", authCookie);
                expect(result.statusCode).toBe(200);
                expect(result.body.length).toBeGreaterThan(0);
                expect(result.body[0].name).toBe("List 1");
            }));
        });
    });
    describe("GET /api/lists/:listId tests", () => {
        describe("given the token is not provided", () => {
            it("should return a 403", () => __awaiter(void 0, void 0, void 0, function* () {
                const result = yield (0, supertest_1.default)(app).get(`/api/lists/${listId}`);
                expect(result.statusCode).toBe(403);
            }));
        });
        describe("given the listId does not exist", () => {
            it("should return a 404", () => __awaiter(void 0, void 0, void 0, function* () {
                const result = yield (0, supertest_1.default)(app)
                    .get(`/api/lists/${dummyListId}`)
                    .set("Cookie", authCookie);
                expect(result.statusCode).toBe(404);
                expect(result.body.message).toBe("Resource not found");
            }));
        });
        describe("given the listId exists", () => {
            it("should return status 200 and an list", () => __awaiter(void 0, void 0, void 0, function* () {
                const result = yield (0, supertest_1.default)(app)
                    .get(`/api/lists/${listId}`)
                    .set("Cookie", authCookie);
                expect(result.statusCode).toBe(200);
                expect(result.body.name).toBe("List 1");
            }));
        });
    });
    describe("PUT /api/lists/:listId tests", () => {
        describe("given the token is not provided", () => {
            it("should return a 403", () => __awaiter(void 0, void 0, void 0, function* () {
                const result = yield (0, supertest_1.default)(app).put(`/api/lists/${listId}`);
                expect(result.statusCode).toBe(403);
            }));
        });
        describe("given the listId does not exist", () => {
            it("should return a 404", () => __awaiter(void 0, void 0, void 0, function* () {
                const result = yield (0, supertest_1.default)(app)
                    .put(`/api/lists/${dummyListId}`)
                    .set("Cookie", authCookie)
                    .send(updateListPayload);
                expect(result.statusCode).toBe(404);
                expect(result.body.message).toBe("Resource not found");
            }));
        });
        describe("given the listId exists and fields are complete", () => {
            it("should return status 200 and an list", () => __awaiter(void 0, void 0, void 0, function* () {
                const result = yield (0, supertest_1.default)(app)
                    .put(`/api/lists/${listId}`)
                    .set("Cookie", authCookie)
                    .send(updateListPayload);
                expect(result.statusCode).toBe(200);
                expect(result.body.name).toBe("List 2");
            }));
        });
    });
    describe("DELETE /api/lists/:listId tests", () => {
        describe("given the token is not provided", () => {
            it("should return a 403", () => __awaiter(void 0, void 0, void 0, function* () {
                const result = yield (0, supertest_1.default)(app).delete(`/api/lists/${listId}`);
                expect(result.statusCode).toBe(403);
            }));
        });
        describe("given the listId does not exist", () => {
            it("should return a 404", () => __awaiter(void 0, void 0, void 0, function* () {
                const result = yield (0, supertest_1.default)(app)
                    .delete(`/api/lists/${dummyListId}`)
                    .set("Cookie", authCookie);
                expect(result.statusCode).toBe(404);
                expect(result.body.message).toBe("Resource not found");
            }));
        });
        describe("given the listId exists", () => {
            it("should return status 200 and correct message", () => __awaiter(void 0, void 0, void 0, function* () {
                const result = yield (0, supertest_1.default)(app)
                    .delete(`/api/lists/${listId}`)
                    .set("Cookie", authCookie);
                expect(result.statusCode).toBe(200);
                expect(result.body.message).toBe("List was successfully deleted.");
            }));
        });
    });
});
