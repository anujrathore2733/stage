import { Router, Request, Response, NextFunction } from 'express';
import Route from '../interfaces/routes.interface';
import * as redis from 'redis';

class IndexRoute implements Route {
    public path = '/';
    public router = Router();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.get(
            `${this.path}`,
            (req: Request, res: Response, next: NextFunction) => {
                try {
                    res.sendStatus(200);
                } catch (error) {
                    next(error);
                }
            }
        );
    }
}

export default IndexRoute;
