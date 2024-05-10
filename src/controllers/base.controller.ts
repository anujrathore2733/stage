import { Request } from "express";
import { Options } from "../interfaces/options.interface";

abstract class BaseController {
    
    public getOptions = (req: Request): Options => {
        return {
            page: Number(req.query.page || 0),
            limit: Number(req.query.limit || 0),
        };
    };
}

export default BaseController;
