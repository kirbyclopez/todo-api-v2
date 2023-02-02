import { NextFunction, Request, Response } from "express";
import { reIssueAccessToken } from "../service/session.service";
import { verifyJwt } from "../utils/jwt.utils";
import cookieConfig from "../utils/cookie-config";

export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (!accessToken) return next();

  const { decoded, expired } = verifyJwt(accessToken);

  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken({ refreshToken });

    if (newAccessToken) {
      res.cookie("accessToken", newAccessToken, cookieConfig);

      const result = verifyJwt(newAccessToken);

      res.locals.user = result.decoded;
      return next();
    }
  }

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  return next();
};
