import { TokenModel } from "@/database/models/Token";
import { UserModel } from "@/database/models/User";
import { Request, Response, NextFunction } from "express";

export const BearerAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers["authorization"];

  if (!token) return next();

  if (token.startsWith("Bearer ")) token = token.slice(7, token.length);

  const tokenDoc = await TokenModel.findOne({ token });

  if (!tokenDoc) return next();

  if (tokenDoc.expiresAt < Date.now()) return next();

  const user = await UserModel.findOne({ id: tokenDoc.userId });

  if (!user) return next();

  req.user = user;

  next();
};
