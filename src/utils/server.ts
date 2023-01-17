import express from "express";
import helmet from "helmet";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "../routes";
import { errorHandler } from "../middleware/error.middleware";
import { notFoundHandler } from "../middleware/notFound.middleware";
import { deserializeUser } from "../middleware/deserializeUser.middleware";

const createServer = () => {
  const app = express();

  app.use(helmet());
  app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
  app.use(express.json());
  app.use(cookieParser());

  app.use(deserializeUser);

  routes(app);

  app.use(errorHandler);
  app.use(notFoundHandler);

  return app;
};

export default createServer;
