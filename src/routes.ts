import { Express, Request, Response } from "express";
import { objectiveRouter } from "./router/objective.router";
import { sessionRouter } from "./router/session.router";
import { userRouter } from "./router/user.router";

const routes = (app: Express) => {
  app.get("/", (req: Request, res: Response) => {
    res.send({ msg: "Todo API v1.0.0" });
  });

  app.use("/api/objectives", objectiveRouter);
  app.use("/api/register", userRouter);
  app.use("/api/auth", sessionRouter);
};

export default routes;
