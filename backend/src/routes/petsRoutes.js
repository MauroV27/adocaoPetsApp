import { Router } from "express";
import { PetController } from "../controllers/petController.js";

const routes = Router();
const petController = new PetController();

routes.get("/", petController.getAll);
routes.post("/", petController.create);

export { routes as petsRoutes };
