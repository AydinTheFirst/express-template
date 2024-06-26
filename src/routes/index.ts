import { Router } from "express";

const router: Router = Router();
export default router;

router.use("/api", (await import("@/routes/api")).default);

router.get("/", (req, res) => {
  res.send("Hello World!");
});

router.use((req, res) => {
  res.status(404).send("Not Found");
});
