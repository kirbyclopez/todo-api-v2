require("dotenv").config({ path: ".env.test" });

import request from "supertest";
import createServer from "../utils/server";
import mongoose from "mongoose";
import { clearLists } from "../service/list.service";
import { clearUsers } from "../service/user.service";
import { clearSessions } from "../service/session.service";

const app = createServer();

let authCookie = new Array(0).fill("");

const userId = new mongoose.Types.ObjectId().toString();

const userPayload = {
  username: "user1",
  name: "New User 1",
  password: "Password1",
  passwordConfirmation: "Password1",
};

const listId = new mongoose.Types.ObjectId().toString();
const dummyListId = "6396da7d01dd1102052c6f51";

const listPayload = {
  _id: listId,
  name: "List 1",
};

const updateListPayload = {
  name: "List 2",
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

  // Clear lists collection
  await clearLists();
});

afterAll(async () => {
  // Clear lists
  await clearLists();

  // Clear sessions collection
  await clearSessions();

  // Clear users
  await clearUsers();

  await mongoose.disconnect();
  await mongoose.connection.close();
});

describe("List resource test suite", () => {
  describe("POST /api/lists tests", () => {
    describe("given the token is not provided", () => {
      it("should return a 403", async () => {
        const result = await request(app).post("/api/lists").send(listPayload);

        expect(result.statusCode).toBe(403);
      });
    });
    describe("given the list fields are complete", () => {
      it("should return status 201 and create an list", async () => {
        const result = await request(app)
          .post("/api/lists")
          .set("Cookie", authCookie)
          .send(listPayload);

        expect(result.statusCode).toBe(201);
        expect(result.body.name).toBe("List 1");
      });
    });
  });

  describe("GET /api/lists tests", () => {
    describe("given the token is not provided", () => {
      it("should return a 403", async () => {
        const result = await request(app).get("/api/lists");

        expect(result.statusCode).toBe(403);
      });
    });
    describe("given the token is provided", () => {
      it("should return status 200 and all lists", async () => {
        const result = await request(app)
          .get("/api/lists")
          .set("Cookie", authCookie);

        expect(result.statusCode).toBe(200);
        expect(result.body.length).toBeGreaterThan(0);
        expect(result.body[0].name).toBe("List 1");
      });
    });
  });

  describe("GET /api/lists/:listId tests", () => {
    describe("given the token is not provided", () => {
      it("should return a 403", async () => {
        const result = await request(app).get(`/api/lists/${listId}`);

        expect(result.statusCode).toBe(403);
      });
    });
    describe("given the listId does not exist", () => {
      it("should return a 404", async () => {
        const result = await request(app)
          .get(`/api/lists/${dummyListId}`)
          .set("Cookie", authCookie);

        expect(result.statusCode).toBe(404);
        expect(result.body.message).toBe("Resource not found");
      });
    });
    describe("given the listId exists", () => {
      it("should return status 200 and an list", async () => {
        const result = await request(app)
          .get(`/api/lists/${listId}`)
          .set("Cookie", authCookie);

        expect(result.statusCode).toBe(200);
        expect(result.body.name).toBe("List 1");
      });
    });
  });

  describe("PUT /api/lists/:listId tests", () => {
    describe("given the token is not provided", () => {
      it("should return a 403", async () => {
        const result = await request(app).put(`/api/lists/${listId}`);

        expect(result.statusCode).toBe(403);
      });
    });
    describe("given the listId does not exist", () => {
      it("should return a 404", async () => {
        const result = await request(app)
          .put(`/api/lists/${dummyListId}`)
          .set("Cookie", authCookie)
          .send(updateListPayload);

        expect(result.statusCode).toBe(404);
        expect(result.body.message).toBe("Resource not found");
      });
    });
    describe("given the listId exists and fields are complete", () => {
      it("should return status 200 and an list", async () => {
        const result = await request(app)
          .put(`/api/lists/${listId}`)
          .set("Cookie", authCookie)
          .send(updateListPayload);

        expect(result.statusCode).toBe(200);
        expect(result.body.name).toBe("List 2");
      });
    });
  });

  describe("DELETE /api/lists/:listId tests", () => {
    describe("given the token is not provided", () => {
      it("should return a 403", async () => {
        const result = await request(app).delete(`/api/lists/${listId}`);

        expect(result.statusCode).toBe(403);
      });
    });
    describe("given the listId does not exist", () => {
      it("should return a 404", async () => {
        const result = await request(app)
          .delete(`/api/lists/${dummyListId}`)
          .set("Cookie", authCookie);

        expect(result.statusCode).toBe(404);
        expect(result.body.message).toBe("Resource not found");
      });
    });
    describe("given the listId exists", () => {
      it("should return status 200 and correct message", async () => {
        const result = await request(app)
          .delete(`/api/lists/${listId}`)
          .set("Cookie", authCookie);

        expect(result.statusCode).toBe(200);
        expect(result.body.message).toBe("List was successfully deleted.");
      });
    });
  });
});
