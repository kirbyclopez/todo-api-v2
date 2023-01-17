require("dotenv").config({ path: ".env.test" });

import request from "supertest";
import createServer from "../utils/server";
import mongoose from "mongoose";
import { clearUsers } from "../service/user.service";
import { clearSessions } from "../service/session.service";

const app = createServer();

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

beforeAll(async () => {
  const dbUri = process.env.DBURI as string;
  await mongoose.connect(dbUri);

  // Create user
  await request(app).post("/api/register").send(userPayload);

  // Clear sessions collection
  await clearSessions();
});

afterAll(async () => {
  // Clear sessions
  await clearSessions();

  // Clear users
  await clearUsers();

  await mongoose.disconnect();
  await mongoose.connection.close();
});

describe("Session resource test suite", () => {
  describe("POST /api/auth/login tests", () => {
    describe("given the credential provided is invalid", () => {
      it("should return a 401 and message", async () => {
        const result = await request(app)
          .post("/api/auth/login")
          .send(invalidUserPayload);

        expect(result.statusCode).toBe(401);
        expect(result.body.message).toBe("Invalid username or password");
      });
    });
    describe("given the credential provided is valid", () => {
      it("should return status 200 and tokens", async () => {
        const result = await request(app)
          .post("/api/auth/login")
          .send(validUserPayload);

        expect(result.statusCode).toBe(200);
        expect(result.body.accessToken).toBeTruthy();
        expect(result.body.refreshToken).toBeTruthy();

        authCookie = result.headers["set-cookie"];
      });
    });
  });

  describe("GET /api/auth/sessions tests", () => {
    describe("given the token is not provided", () => {
      it("should return a 403", async () => {
        const result = await request(app).get("/api/auth/sessions");

        expect(result.statusCode).toBe(403);
      });
    });
    describe("given the token is provided", () => {
      it("should return a 200 and all active sessions", async () => {
        const result = await request(app)
          .get("/api/auth/sessions")
          .set("Cookie", authCookie);

        expect(result.statusCode).toBe(200);
        expect(result.body.length).toBeGreaterThan(0);
      });
    });
  });
});
