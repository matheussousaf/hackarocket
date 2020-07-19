import { Router } from "express";
import { HealthController } from "@controllers/HealthController";
import auth from "./auth";
import product from "./product";
import whatsapp from "./whatsapp";
import router from "./auth";

const routes = Router();

routes.get("/", HealthController.healthCheck);

routes.use("/user", auth);
routes.use("/products", product);
routes.use("/wpp", whatsapp);

export default routes;
