import { Router } from "express";
import { UserController } from "@controllers/UserController";
import { AuthController } from "@controllers/AuthController";
import createStorage from "@config/multer";
import multer from "multer";

const upload = multer(createStorage("profiles"));
const router = Router();

router.get("/", UserController.list);
router.post("/register", upload.single("image"), UserController.create);
router.post("/edit", upload.single("image"), UserController.edit);
router.post("/login", AuthController.login);

export default router;
