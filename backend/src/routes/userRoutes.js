import { Router } from "express";
import { create, getById, login, promoteUserToAdmin } from "../controllers/userController.js";

const routes = Router();

routes.get('/user/:id', getById);
routes.post('/singup', create);
routes.post('/login', login);

routes.post('/user/promote', promoteUserToAdmin);

export { routes as usersRoutes }; 