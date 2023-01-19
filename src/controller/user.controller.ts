import { Request, Response } from "express";
import { CreateUserInput } from "../schema/user.schema";
import { createUser } from "../service/user.service";
import logger from "../utils/logger";
import { createSession } from "../service/session.service";
import { signJwt } from "../utils/jwt.utils";
import cookieConfig from "../utils/cookie-config";

export const createUserHandler = async (
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) => {
  try {
    const user = await createUser(req.body);

    const session = await createSession(user._id, req.get("user-agent") || "");

    const accessToken = signJwt(
      {
        uid: user._id,
        name: user.name,
        username: user.username,
        sid: session._id,
      },
      { expiresIn: process.env.ACCESSTOKENTTL }
    );

    const refreshToken = signJwt(
      {
        uid: user._id,
        name: user.name,
        username: user.username,
        sid: session._id,
      },
      { expiresIn: process.env.REFRESHTOKENTTL }
    );

    res.cookie("accessToken", accessToken, cookieConfig);
    res.cookie("refreshToken", refreshToken, cookieConfig);

    return res.status(201).send({ accessToken, refreshToken });
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send({ message: e.message });
  }
};
