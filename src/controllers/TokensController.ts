import { Request, Response } from "express";
import { TokenModel } from "@/database/models/Token";
import { generateToken } from "@/utils";
import { BadRequestError } from "@/lib/express";

class TokensController {
  async verifyToken(req: Request, res: Response) {
    const token = req.headers["authorization"];

    if (!token) {
      BadRequestError(res, "Token is required");
    }

    const tokenDoc = await TokenModel.findOne({ token });

    if (!tokenDoc) {
      return res.status(400).send({
        message: "Invalid token",
      });
    }

    if (tokenDoc.expiresAt < Date.now()) {
      return res.status(400).send({
        message: "Token expired",
      });
    }

    res.send(tokenDoc);
  }
}

export const tokensController = new TokensController();
