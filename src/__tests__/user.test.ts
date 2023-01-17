require("dotenv").config({ path: ".env.test" });

import request from "supertest";
import createServer from "../utils/server";
import mongoose from "mongoose";
import { clearUsers } from "../service/user.service";

const app = createServer();

const userId = new mongoose.Types.ObjectId().toString();

const userPayload = {
  _id: userId,
  username: "user1",
  name: "New User 1",
  password: "Password1",
  passwordConfirmation: "Password1",
};

beforeAll(async () => {
  const dbUri = process.env.DBURI as string;
  await mongoose.connect(dbUri);
});

afterAll(async () => {
  // Clean users collection
  await clearUsers();

  await mongoose.disconnect();
  await mongoose.connection.close();
});

describe("User resource test suite", () => {
  describe("POST /api/register tests", () => {
    describe("given the user fields are complete", () => {
      it("should return status 201 and create a user", async () => {
        const result = await request(app)
          .post("/api/register")
          .send(userPayload);

        expect(result.statusCode).toBe(201);
        expect(result.body.username).toBe("user1");
        expect(result.body.name).toBe("New User 1");
      });
    });
  });
});
