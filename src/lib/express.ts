import { NextFunction, Response, Request } from "express";

type ErrorMessage = string | Record<string, unknown> | Array<unknown>;

export const APIError = (
  res: Response,
  statusCode: number,
  message: ErrorMessage
) => {
  res.status(statusCode).send({ message });
};

export const BadRequestError = (res: Response, message?: ErrorMessage) => {
  APIError(res, 400, message || "Bad Request");
};

export const UnauthorizedError = (res: Response, message?: ErrorMessage) => {
  APIError(res, 401, message || "Unauthorized");
};

export const ForbiddenError = (res: Response, message?: ErrorMessage) => {
  APIError(res, 403, message || "Forbidden");
};

export const NotFoundError = (res: Response, message?: string) => {
  APIError(res, 404, message || "Not Found");
};

export const InvalidPayloadError = (res: Response, error: Zod.ZodError) => {
  const errorMessage = error.errors.map((err) => {
    return {
      message: err.message,
      path: err.path,
    };
  });

  res.status(422).send({ message: "Invalid payload", errors: errorMessage });
};

export const asyncHandler =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(fn(req, res, next)).catch(next);
  };

export const VerifyPayload = (schema: Zod.ZodObject<any, any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (result.success) {
      req.body = result.data;
      return next();
    }

    InvalidPayloadError(res, result.error);
  };
};
