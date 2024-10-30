import { Router } from "express";

import { petsRoutes } from "./petsRoutes.js";

const routes = Router();

routes.use("/pets", petsRoutes);

export default routes;
