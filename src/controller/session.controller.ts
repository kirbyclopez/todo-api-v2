import { Request, Response } from "express";
import {
  createSession,
  findSessions,
  updateSession,
} from "../service/session.service";
import { validatePassword } from "../service/user.service";
import { signJwt } from "../utils/jwt.utils";
import cookieConfig from "../utils/cookie-config";

export const createUserSessionHandler = async (req: Request, res: Response) => {
  const user = await validatePassword(req.body);

  if (!user)
    return res.status(401).send({ message: "Invalid username or password" });

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

  return res.send({ accessToken, refreshToken });
};

export const getUserSessionsHandler = async (req: Request, res: Response) => {
  const userId = res.locals.user.uid;

  const sessions = await findSessions({ user: userId, valid: true });

  return res.send(sessions);
};

export const deleteSessionHandler = async (req: Request, res: Response) => {
  const sessionId = res.locals.user.sid;

  await updateSession({ _id: sessionId }, { valid: false });

  res.clearCookie("accessToken").clearCookie("refreshToken");

  return res.send({
    accessToken: null,
    refreshToken: null,
  });
};
