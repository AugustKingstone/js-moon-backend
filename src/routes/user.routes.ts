import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";
import { validate } from "../middlewares/validate.middleware";
import { updateUserSchema } from "../validators/user.validator";

const router = Router();

router.use(authMiddleware);

router.get("/", UserController.getAll);
router.get("/:id", UserController.getById);
router.put("/:id", validate(updateUserSchema), UserController.update);
router.delete("/:id", UserController.delete);

export default router;
