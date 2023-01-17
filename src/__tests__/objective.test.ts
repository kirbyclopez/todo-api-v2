require("dotenv").config({ path: ".env.test" });

import request from "supertest";
import createServer from "../utils/server";
import mongoose from "mongoose";
import { clearObjectives } from "../service/objective.service";
import { clearUsers } from "../service/user.service";

const app = createServer();

let authCookie = new Array(0).fill("");

const userPayload = {
  username: "user1",
  name: "New User 1",
  password: "Password1",
  passwordConfirmation: "Password1",
};

const objectiveId = new mongoose.Types.ObjectId().toString();
const dummyObjectiveId = "6396da7d01dd1102052c6f51";

const objectivePayload = {
  _id: objectiveId,
  name: "Objective 1",
  description: "This is the description of Objective 1",
  reason: "For improvement",
  targetDate: new Date("2022-12-01"),
  completedDate: new Date("2022-12-31"),
};

const updateObjectivePayload = {
  name: "Objective 2",
  description: "This is the description of Objective 2",
  reason: "For improvement 2",
  targetDate: new Date("2023-01-01"),
  completedDate: new Date("2023-01-31"),
};

beforeAll(async () => {
  const dbUri = process.env.DBURI as string;
  await mongoose.connect(dbUri);

  // Create user
  await request(app).post("/api/register").send(userPayload);

  // Login to get access token
  const response = await request(app).post("/api/auth/login").send({
    username: "user1",
    password: "Password1",
  });

  authCookie = response.headers["set-cookie"];

  // Clear objectives collection
  await clearObjectives();
});

afterAll(async () => {
  // Clear objectives
  await clearObjectives();

  // Clear users
  await clearUsers();

  await mongoose.disconnect();
  await mongoose.connection.close();
});

describe("Objective resource test suite", () => {
  describe("POST /api/objectives tests", () => {
    describe("given the token is not provided", () => {
      it("should return a 403", async () => {
        const result = await request(app)
          .post("/api/objectives")
          .send(objectivePayload);

        expect(result.statusCode).toBe(403);
      });
    });
    describe("given the objective fields are complete", () => {
      it("should return status 201 and create an objective", async () => {
        const result = await request(app)
          .post("/api/objectives")
          .set("Cookie", authCookie)
          .send(objectivePayload);

        expect(result.statusCode).toBe(201);
        expect(result.body.name).toBe("Objective 1");
      });
    });
  });

  describe("GET /api/objectives tests", () => {
    describe("given the token is not provided", () => {
      it("should return a 403", async () => {
        const result = await request(app).get("/api/objectives");

        expect(result.statusCode).toBe(403);
      });
    });
    describe("given the token is provided", () => {
      it("should return status 200 and all objectives", async () => {
        const result = await request(app)
          .get("/api/objectives")
          .set("Cookie", authCookie);

        expect(result.statusCode).toBe(200);
        expect(result.body.length).toBeGreaterThan(0);
        expect(result.body[0].name).toBe("Objective 1");
      });
    });
  });

  describe("GET /api/objectives/:objectiveId tests", () => {
    describe("given the token is not provided", () => {
      it("should return a 403", async () => {
        const result = await request(app).get(`/api/objectives/${objectiveId}`);

        expect(result.statusCode).toBe(403);
      });
    });
    describe("given the objectiveId does not exist", () => {
      it("should return a 404", async () => {
        const result = await request(app)
          .get(`/api/objectives/${dummyObjectiveId}`)
          .set("Cookie", authCookie);

        expect(result.statusCode).toBe(404);
        expect(result.body.message).toBe("Resource not found");
      });
    });
    describe("given the objectiveId exists", () => {
      it("should return status 200 and an objective", async () => {
        const result = await request(app)
          .get(`/api/objectives/${objectiveId}`)
          .set("Cookie", authCookie);

        expect(result.statusCode).toBe(200);
        expect(result.body.name).toBe("Objective 1");
      });
    });
  });

  describe("PUT /api/objectives/:objectiveId tests", () => {
    describe("given the token is not provided", () => {
      it("should return a 403", async () => {
        const result = await request(app).put(`/api/objectives/${objectiveId}`);

        expect(result.statusCode).toBe(403);
      });
    });
    describe("given the objectiveId does not exist", () => {
      it("should return a 404", async () => {
        const result = await request(app)
          .put(`/api/objectives/${dummyObjectiveId}`)
          .set("Cookie", authCookie)
          .send(updateObjectivePayload);

        expect(result.statusCode).toBe(404);
        expect(result.body.message).toBe("Resource not found");
      });
    });
    describe("given the objectiveId exists and fields are complete", () => {
      it("should return status 200 and an objective", async () => {
        const result = await request(app)
          .put(`/api/objectives/${objectiveId}`)
          .set("Cookie", authCookie)
          .send(updateObjectivePayload);

        expect(result.statusCode).toBe(200);
        expect(result.body.name).toBe("Objective 2");
      });
    });
  });

  describe("PATCH /api/objectives/:objectiveId tests", () => {
    describe("given the token is not provided", () => {
      it("should return a 403", async () => {
        const result = await request(app).patch(
          `/api/objectives/${objectiveId}`
        );

        expect(result.statusCode).toBe(403);
      });
    });
    describe("given the objectiveId does not exist", () => {
      it("should return a 404", async () => {
        const result = await request(app)
          .patch(`/api/objectives/${dummyObjectiveId}`)
          .set("Cookie", authCookie)
          .send(updateObjectivePayload);

        expect(result.statusCode).toBe(404);
        expect(result.body.message).toBe("Resource not found");
      });
    });
    describe("given the objectiveId exists and fields are complete", () => {
      it("should return status 200 and an objective", async () => {
        const result = await request(app)
          .patch(`/api/objectives/${objectiveId}`)
          .set("Cookie", authCookie)
          .send(updateObjectivePayload);

        expect(result.statusCode).toBe(200);
        expect(result.body.name).toBe("Objective 2");
      });
    });
  });

  describe("DELETE /api/objectives/:objectiveId tests", () => {
    describe("given the token is not provided", () => {
      it("should return a 403", async () => {
        const result = await request(app).delete(
          `/api/objectives/${objectiveId}`
        );

        expect(result.statusCode).toBe(403);
      });
    });
    describe("given the objectiveId does not exist", () => {
      it("should return a 404", async () => {
        const result = await request(app)
          .delete(`/api/objectives/${dummyObjectiveId}`)
          .set("Cookie", authCookie);

        expect(result.statusCode).toBe(404);
        expect(result.body.message).toBe("Resource not found");
      });
    });
    describe("given the objectiveId exists", () => {
      it("should return status 200 and correct message", async () => {
        const result = await request(app)
          .delete(`/api/objectives/${objectiveId}`)
          .set("Cookie", authCookie);

        expect(result.statusCode).toBe(200);
        expect(result.body.message).toBe("Objective was successfully deleted.");
      });
    });
  });
});
