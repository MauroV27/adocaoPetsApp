import { PetController } from "../controllers/petController"

const petController = new PetController();

export function petsRoutes(router) {
    
    router.get('/pet/:id', petController.getById);
    router.post('/pet/:id', petController.insertPet);
    // router.get('/pet/:id', petController.getById);

}