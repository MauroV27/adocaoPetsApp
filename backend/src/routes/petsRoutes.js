import { Router } from "express";
import { create, getPetById, getAll, update, deletePet } from '../controllers/petController.js';
import { authAdminMiddleware } from '../security/jwt-middleware.js';

const routes = Router();

routes.post("/pets", authAdminMiddleware, create);
routes.get("/pets/:id", getPetById);
routes.get("/pets", getAll);
routes.put("/pets/:id", authAdminMiddleware, update);
routes.delete("/pets/:id", authAdminMiddleware, deletePet);


export { routes as petsRoutes };
