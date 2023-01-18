"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const session_router_1 = require("./router/session.router");
const user_router_1 = require("./router/user.router");
const list_router_1 = require("./router/list.router");
const item_router_1 = require("./router/item.router");
const routes = (app) => {
    app.get("/", (req, res) => {
        res.send({ msg: "Todo API v1.0.0" });
    });
    app.use("/api/register", user_router_1.userRouter);
    app.use("/api/auth", session_router_1.sessionRouter);
    app.use("/api/lists", list_router_1.listRouter);
    app.use("/api/items", item_router_1.itemRouter);
};
exports.default = routes;
