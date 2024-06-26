import { BearerAuth } from "@/auth";
import RateLimit from "@/middlewares/rateLimit";
import { Router } from "express";
import fs from "node:fs";

const router: Router = Router();
export default router;

router.use(RateLimit);
router.use(BearerAuth);

router.get("/", (req, res) => {
  const pkg = JSON.parse(fs.readFileSync("package.json", "utf-8"));

  return res.send({
    name: pkg.name,
    version: pkg.version,
    description: pkg.description,
  });
});

router.use((req, res) => {
  res.status(404).send({ message: "Not Found" });
});
