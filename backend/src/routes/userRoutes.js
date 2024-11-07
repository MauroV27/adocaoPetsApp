import { Router } from "express";
import { create, getById, login, promoteUserToAdmin } from "../controllers/user/controller.js";
import { authAdminMiddleware, authUserOrAdminMidlewware } from '../security/jwt-middleware.js';

const routes = Router();

routes.post('/singup', create);
routes.post('/login', login);

routes.get('/user/:id', authUserOrAdminMidlewware, getById);
routes.post('/user/promote', authAdminMiddleware, promoteUserToAdmin);

export { routes as usersRoutes }; 