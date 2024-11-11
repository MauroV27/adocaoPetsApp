import { Router } from "express";

import { petsRoutes } from "./petsRoutes.js";
import { usersRoutes } from "./userRoutes.js";
import { adoptionsRoutes } from "./adoptionRoutes.js";

const routes = Router();
// TODO testar com rotas aqui
routes.use("/", petsRoutes
    // #swagger.tags = ['Pets']
);

routes.use("/", usersRoutes
    // #swagger.tags = ['Users']
);
routes.use("/", adoptionsRoutes
    // #swagger.tags = ['Adopt']
);

export default routes;
