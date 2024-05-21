import { TokenModel } from "@/database/models/Token";
import { UserModel } from "@/database/models/User";
import { BadRequestError } from "@/lib/express";
import { Request, Response, NextFunction } from "express";

export const BearerAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers["authorization"];

  if (!token) {
    return BadRequestError(res, "Token is required");
  }

  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }

  const tokenDoc = await TokenModel.findOne({ token });

  if (!tokenDoc) {
    return BadRequestError(res, "Invalid token");
  }

  if (tokenDoc.expiresAt < Date.now()) {
    return BadRequestError(res, "Token expired");
  }

  const user = await UserModel.findOne({ id: tokenDoc.userId });

  if (!user) {
    return BadRequestError(res, "User not found");
  }

  req.user = user;

  next();
};
