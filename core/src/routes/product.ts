import { Router } from "express";
import { UserController } from "@controllers/UserController";
import { AuthController } from "@controllers/AuthController";
import { ProductController } from "@controllers/ProductController";
import createStorage from "@config/multer";
import multer from "multer";
import { checkJwt } from "@middlewares/checkJwt";

const upload = multer(createStorage("products"));
const router = Router();

router.get("/", checkJwt, ProductController.list);
router.post("/", [upload.single("image"), checkJwt], ProductController.create);
router.delete("/:productId", ProductController.delete);
router.put("/:productId", ProductController.edit);
router.get("/:productId", ProductController.index);
// router.post(":id", chec);

export default router;
