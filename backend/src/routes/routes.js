import { Router } from "express";

import { petsRoutes } from "./petsRoutes.js";
import { usersRoutes } from "./userRoutes.js";

const routes = Router();

routes.use("/pets", petsRoutes);
routes.use("/", usersRoutes);

export default routes;
