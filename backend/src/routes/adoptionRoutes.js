import { Router } from "express";
import { getById, getAll, create, update, deleteAdoption } from "../controllers/adoptController.js";
import { authAdminMiddleware} from '../security/jwt-middleware.js';

const routes = Router();

routes.post("/adoption", authAdminMiddleware, create);
routes.get("/adoption/:id", authAdminMiddleware, getById);
routes.get("/adoption/", authAdminMiddleware, getAll);
routes.put("/adoption/:id", authAdminMiddleware, update);
routes.delete("/adoption/:id", authAdminMiddleware, deleteAdoption);

export { routes as adoptionsRoutes };