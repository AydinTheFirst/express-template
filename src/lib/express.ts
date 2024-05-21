import { NextFunction, Response, Router, Request } from "express";
import { ZodError } from "zod";

type ErrorMessage = string | Record<string, unknown> | Array<unknown>;

/**
 *
 * @param res Response object
 * @param statusCode HTTP status code
 * @param message error message
 */
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

/**
 * Wraps an Express route handler with error handling middleware
 * @param fn Function to be wrapped
 * @returns Express Request Handler
 */
export const asyncHandler =
  (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    return Promise.resolve(fn(req, res, next)).catch(next);
  };

/**
 * Wraps an Express Router with error handling middleware
 * @param router Express Router
 * @returns Express Router
 */
export const asyncRouter = (router: Router) => {
  return router.use(
    (err: any, _req: Request, res: Response, next: NextFunction) => {
      if (err instanceof ZodError) {
        return InvalidPayloadError(res, err);
      }

      if (err instanceof Error) {
        console.error(err);
        return APIError(res, 500, "Internal Server Error");
      }

      next();
    }
  );
};
