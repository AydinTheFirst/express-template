import { Router } from "express";
import { ApiRouter } from "./ApiRouter";
import { NotFoundError } from "@/lib/express";

const router = Router();
export { router as AppRouter };

router.use("/api", ApiRouter);

router.get("/", (req, res) => {
  res.send("Hello, world!");
});

router.use("*", (req, res) => {
  return NotFoundError(res, "The route you are looking for does not exist.");
});
