import UsersController from "@/controllers/UsersController";
import { Router } from "express";

const router = Router();
export { router as UsersRouter };

router.get("/", UsersController.getAll);

router.get("/:id", UsersController.getOne);

router.post("/", UsersController.create);

router.put("/:id", UsersController.update);

router.delete("/:id", UsersController.delete);
