import { Router } from "express";
import { ProductController } from "@controllers/ProductController";
import createStorage from "@config/multer";
import multer from "multer";
import { checkJwt } from "@middlewares/checkJwt";

const upload = multer(createStorage("products"));
const router = Router();

router.get("/", checkJwt, ProductController.list);
router.post("/", [upload.single("image"), checkJwt], ProductController.create);
router.delete("/:productId", checkJwt, ProductController.delete);
router.put("/:productId", [upload.single("image"), checkJwt], ProductController.edit);
router.get("/:productId", checkJwt, ProductController.index);
// router.post(":id", chec);

export default router;
