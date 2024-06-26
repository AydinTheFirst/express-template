import AuthController from "@/controllers/AuthController";
import { Router } from "express";

const router: Router = Router();
export default router;

router.get("/@me", AuthController.getMe);

router.post("/login", AuthController.login);

router.post("/register", AuthController.register);
