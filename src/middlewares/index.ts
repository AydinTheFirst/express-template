import { Handler } from "express";
import chalk from "chalk";
export * from "./cors";
export * from "./auth";
export * from "./rateLimit";
export * from "./zod";
export * from "./multer";

export const logRequests: Handler = (req, res, next) => {
  const time = new Date().toISOString();

  console.log(
    `${chalk.blue(time)} - ${chalk.green(req.method)} => ${chalk.yellow(
      req.url
    )}`
  );

  next();
};
