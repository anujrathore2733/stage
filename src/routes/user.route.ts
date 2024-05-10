import { Router} from 'express';
import Route from '../interfaces/routes.interface';
import UserController from '../controllers/user.controller';


class UserRoute implements Route {
    public path = '/user';
    public router = Router();
    private userController = new UserController()

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(
            `${this.path}/:userId/list`,
            this.userController.getList
        );

        this.router.put(
            `${this.path}/:userId/add/:contentId`,
            this.userController.addToList
        )

        this.router.delete(
            `${this.path}/:userId/remove/:contentId`,
            this.userController.removeFromList
        )
    }
}

export default UserRoute;
