import { Router } from "express";

import { petsRoutes } from "./petsRoutes";

const router = Router();

petsRoutes(router);

export { router };