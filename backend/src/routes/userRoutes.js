import { Router } from "express";
import { create, getById, login, promoteUserToAdmin, getAll, update, deleteUser } from "../controllers/user/controller.js";
import { authAdminMiddleware, authMiddleware } from '../security/jwt-middleware.js';

const routes = Router();

routes.post('/singup', create);
routes.post('/login', login);

routes.get('/user/:id', authMiddleware, getById);
routes.get('/users', authAdminMiddleware, getAll);
routes.put("/user/:id", authAdminMiddleware, update);
routes.delete("/user/:id", authAdminMiddleware, deleteUser);
routes.post('/user/promote', authAdminMiddleware, promoteUserToAdmin);

export { routes as usersRoutes };