import { Router } from "express";
import { create, getById, login, promoteUserToAdmin } from "../controllers/user/controller.js";
import { authOrBlockMiddleware, authOrPassMidlewware } from '../security/jwt-midleware.js';

const routes = Router();

routes.post('/singup', create);
routes.post('/login', login);

routes.get('/user/:id', authOrPassMidlewware, getById);
routes.post('/user/promote', authOrBlockMiddleware, promoteUserToAdmin);

export { routes as usersRoutes }; 