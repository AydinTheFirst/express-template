import { UnauthorizedError } from "@/lib/express";
import { Handler } from "express";

export const isLoggedIn: Handler = (req, res, next) => {
  if (!req.user) {
    return UnauthorizedError(res, "You are not logged in!");
  }

  next();
};

export const isAdmin: Handler = (req, res, next) => {
  if (!req.user) {
    return UnauthorizedError(res, "You are not logged in!");
  }

  if (!req.user.isAdmin) {
    return UnauthorizedError(
      res,
      "You are not authorized to access this route!"
    );
  }

  next();
};
