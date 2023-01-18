import { Request, Response } from "express";
import { CreateUserInput } from "../schema/user.schema";
import { createUser } from "../service/user.service";
import logger from "../utils/logger";
import { createSession } from "../service/session.service";
import { signJwt } from "../utils/jwt.utils";

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

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    return res.status(201).send({ accessToken, refreshToken });
  } catch (e: any) {
    logger.error(e);
    return res.status(409).send({ message: e.message });
  }
};
