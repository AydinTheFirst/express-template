import { BearerAuth } from "@/auth";
import AuthController from "@/controllers/AuthController";
import { Router } from "express";

const router = Router();
export { router as AuthRouter };

router.get("/@me", BearerAuth, AuthController.getMe);

router.post("/login", AuthController.login);

router.post("/register", AuthController.register);
