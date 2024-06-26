import UsersController from "@/controllers/UsersController";
import { isAdmin } from "@/middlewares";
import { Router } from "express";

const router: Router = Router();
export default router;

router.get("/", UsersController.findAll);

router.get("/:id", UsersController.findOne);

router.use(isAdmin); // Rest of the routes are only accessible by admin

router.post("/", UsersController.create);

router.put("/:id", UsersController.update);

router.delete("/:id", UsersController.delete);
