import { UserController } from "../controllers/userController";

const userController = new UserController();

export function userRoutes( router ){

    router.get('/user/:id', userController.getById);
    router.post('/singup', userController.insertUser);
    router.post('/login', userController.validateLogin);

} 