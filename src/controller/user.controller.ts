import { Request, Response } from "express";
import { CreateUserInput } from "../schema/user.schema";
import { createUser } from "../service/user.service";
import logger from "../utils/logger";

export const createUserHandler = async (
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) => {
  try {
    const user = await createUser(req.body);
    return res.status(201).send(user);
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send({ message: e.message });
  }
};
