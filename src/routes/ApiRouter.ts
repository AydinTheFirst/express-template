import pkg from "../../package.json";
import { Router } from "express";
import { UsersRouter } from "./UsersRouter";
import { AuthRouter } from "./AuthRouter";
import { NotFoundError } from "@/lib/express";

const router = Router();
export { router as ApiRouter };

router.use("/auth", AuthRouter);
router.use("/users", UsersRouter);

router.get("/", (req, res) => {
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
