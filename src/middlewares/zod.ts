import { InvalidPayloadError } from "@/lib/express";
import { Request, Response, NextFunction } from "express";
import { Schema } from "zod";

export const VerifyPayload = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return InvalidPayloadError(res, result.error);
    }

    req.body = result.data;
    next();
  };
};
