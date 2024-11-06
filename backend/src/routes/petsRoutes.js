import { Router } from "express";
import * as PetController from "../controllers/petController.js";

const routes = Router();

routes.get("/", PetController.getAll);
routes.post("/", PetController.create);

export { routes as petsRoutes };
