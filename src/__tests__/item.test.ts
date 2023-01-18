require("dotenv").config({ path: ".env.test" });

import request from "supertest";
import createServer from "../utils/server";
import mongoose from "mongoose";
import { clearItems } from "../service/item.service";
import { clearUsers } from "../service/user.service";
import { clearLists } from "../service/list.service";
import { clearSessions } from "../service/session.service";

const app = createServer();

let authCookie = new Array(0).fill("");

const userPayload = {
  username: "user1",
  name: "New User 1",
  password: "Password1",
  passwordConfirmation: "Password1",
};

const listId = new mongoose.Types.ObjectId().toString();
const itemId = new mongoose.Types.ObjectId().toString();
const dummyItemId = "6396da7d01dd1102052c6f51";

const listPayload = {
  _id: listId,
  name: "List 1",
};

const itemPayload = {
  _id: itemId,
  listId: listId,
  name: "Item 1",
  isComplete: false,
};

const updateItemPayload = {
  listId: listId,
  name: "Item 2",
  isComplete: true,
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

  // Clear items collection
  await clearItems();

  // Clear lists collection
  await clearLists();

  // Create a list
  await request(app)
    .post("/api/lists")
    .set("Cookie", authCookie)
    .send(listPayload);
});

afterAll(async () => {
  // Clear items
  await clearItems();

  // Clear lists collection
  await clearLists();

  // Clear sessions collection
  await clearSessions();

  // Clear users
  await clearUsers();

  await mongoose.disconnect();
  await mongoose.connection.close();
});

describe("Item resource test suite", () => {
  describe("POST /api/items tests", () => {
    describe("given the token is not provided", () => {
      it("should return a 403", async () => {
        const result = await request(app).post("/api/items").send(itemPayload);

        expect(result.statusCode).toBe(403);
      });
    });
    describe("given the item fields are complete", () => {
      it("should return status 201 and create an item", async () => {
        const result = await request(app)
          .post("/api/items")
          .set("Cookie", authCookie)
          .send(itemPayload);

        expect(result.statusCode).toBe(201);
        expect(result.body.name).toBe("Item 1");
      });
    });
  });

  describe("GET /api/lists/:listId/items tests", () => {
    describe("given the token is not provided", () => {
      it("should return a 403", async () => {
        const result = await request(app).get(`/api/lists/${listId}/items`);

        expect(result.statusCode).toBe(403);
      });
    });
    describe("given the token is provided", () => {
      it("should return status 200 and all items of the list", async () => {
        const result = await request(app)
          .get(`/api/lists/${listId}/items`)
          .set("Cookie", authCookie);

        expect(result.statusCode).toBe(200);
        expect(result.body.length).toBeGreaterThan(0);
        expect(result.body[0].name).toBe("Item 1");
      });
    });
  });

  describe("GET /api/items/:itemId tests", () => {
    describe("given the token is not provided", () => {
      it("should return a 403", async () => {
        const result = await request(app).get(`/api/items/${itemId}`);

        expect(result.statusCode).toBe(403);
      });
    });
    describe("given the itemId does not exist", () => {
      it("should return a 404", async () => {
        const result = await request(app)
          .get(`/api/items/${dummyItemId}`)
          .set("Cookie", authCookie);

        expect(result.statusCode).toBe(404);
        expect(result.body.message).toBe("Resource not found");
      });
    });
    describe("given the itemId exists", () => {
      it("should return status 200 and an item", async () => {
        const result = await request(app)
          .get(`/api/items/${itemId}`)
          .set("Cookie", authCookie);

        expect(result.statusCode).toBe(200);
        expect(result.body.name).toBe("Item 1");
      });
    });
  });

  describe("PUT /api/items/:itemId tests", () => {
    describe("given the token is not provided", () => {
      it("should return a 403", async () => {
        const result = await request(app).put(`/api/items/${itemId}`);

        expect(result.statusCode).toBe(403);
      });
    });
    describe("given the itemId does not exist", () => {
      it("should return a 404", async () => {
        const result = await request(app)
          .put(`/api/items/${dummyItemId}`)
          .set("Cookie", authCookie)
          .send(updateItemPayload);

        expect(result.statusCode).toBe(404);
        expect(result.body.message).toBe("Resource not found");
      });
    });
    describe("given the itemId exists and fields are complete", () => {
      it("should return status 200 and an item", async () => {
        const result = await request(app)
          .put(`/api/items/${itemId}`)
          .set("Cookie", authCookie)
          .send(updateItemPayload);

        expect(result.statusCode).toBe(200);
        expect(result.body.name).toBe("Item 2");
      });
    });
  });

  describe("PATCH /api/items/:itemId tests", () => {
    describe("given the token is not provided", () => {
      it("should return a 403", async () => {
        const result = await request(app).patch(`/api/items/${itemId}`);

        expect(result.statusCode).toBe(403);
      });
    });
    describe("given the itemId does not exist", () => {
      it("should return a 404", async () => {
        const result = await request(app)
          .patch(`/api/items/${dummyItemId}`)
          .set("Cookie", authCookie)
          .send(updateItemPayload);

        expect(result.statusCode).toBe(404);
        expect(result.body.message).toBe("Resource not found");
      });
    });
    describe("given the itemId exists and fields are complete", () => {
      it("should return status 200 and an item", async () => {
        const result = await request(app)
          .patch(`/api/items/${itemId}`)
          .set("Cookie", authCookie)
          .send(updateItemPayload);

        expect(result.statusCode).toBe(200);
        expect(result.body.name).toBe("Item 2");
      });
    });
  });

  describe("DELETE /api/items/:itemId tests", () => {
    describe("given the token is not provided", () => {
      it("should return a 403", async () => {
        const result = await request(app).delete(`/api/items/${itemId}`);

        expect(result.statusCode).toBe(403);
      });
    });
    describe("given the itemId does not exist", () => {
      it("should return a 404", async () => {
        const result = await request(app)
          .delete(`/api/items/${dummyItemId}`)
          .set("Cookie", authCookie);

        expect(result.statusCode).toBe(404);
        expect(result.body.message).toBe("Resource not found");
      });
    });
    describe("given the itemId exists", () => {
      it("should return status 200 and correct message", async () => {
        const result = await request(app)
          .delete(`/api/items/${itemId}`)
          .set("Cookie", authCookie);

        expect(result.statusCode).toBe(200);
        expect(result.body.message).toBe("Item was successfully deleted.");
      });
    });
  });
});
