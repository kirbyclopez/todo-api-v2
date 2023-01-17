import { Request, Response, NextFunction } from "express";
import { findSessions } from "../service/session.service";

const requireUser = async (req: Request, res: Response, next: NextFunction) => {
  const user = res.locals.user;

  if (!user) return res.sendStatus(403);

  const sessions = await findSessions({ _id: user.sid, valid: true });

  if (!sessions || sessions.length === 0) return res.sendStatus(403);

  return next();
};

export default requireUser;
