import { Router } from "express";
import fs from "node:fs";

import { NotFoundError } from "@/lib/express";
import { BearerAuth } from "@/auth";
import { rateLimit } from "@/middlewares";

import { AuthRouter } from "./AuthRouter";
import { UsersRouter } from "./UsersRouter";

const router = Router();
export { router as ApiRouter };

router.use(rateLimit);
router.use(BearerAuth);

router.use("/auth", AuthRouter);
router.use("/users", UsersRouter);

router.get("/", (_req, res) => {
  const pkg = JSON.parse(fs.readFileSync("package.json", "utf-8"));
  res.send({
    message: "API is working!",
    name: pkg.name,
    description: pkg.description,
    version: pkg.version,
  });
});

router.use("*", (req, res) => {
  return NotFoundError(res, "Route not found");
});
