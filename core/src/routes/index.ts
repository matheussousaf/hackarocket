import { Router } from "express";
import { HealthController } from "@controllers/HealthController";
import auth from "./auth";
import product from "./product";

const routes = Router();

routes.get("/", HealthController.healthCheck);

routes.use("/user", auth);
routes.use("/products", product);

export default routes;
