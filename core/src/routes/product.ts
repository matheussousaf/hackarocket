import { Router } from "express";
import { UserController } from "@controllers/UserController";
import { AuthController } from "@controllers/AuthController";
import { ProductController } from "@controllers/ProductController";
import createStorage from "@config/multer";
import multer from "multer";
import { checkJwt } from "@middlewares/checkJwt";

const upload = multer(createStorage("products"));
const router = Router();

router.get("/", ProductController.list);
router.post(
  "/create",
  [upload.single("image"), checkJwt],
  UserController.create
);
// router.post(":id", chec);

export default router;
