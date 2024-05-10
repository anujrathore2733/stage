import { NextFunction, Request, Response } from "express";
import BaseController from "./base.controller";
import ApiResponse from "../responses/ApiResponse";
import HttpException from "../exceptions/HttpException";
import UserService from "../services/user.service";



class UserController extends BaseController {
    private userService = new UserService();
    

    public getList = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const userId = req.params.userId
            if(!userId){
                throw new HttpException(422,"User Id is Required")
            }
            const options = this.getOptions(req)
            const data = await this.userService.getList(userId,options)
            const resp: ApiResponse = new ApiResponse({
                success: true,
                message: "Operation successful",
                data: data
            });
            res.status(200).json(resp);
        } catch (error) {
            next(error);
        }
    };


    public addToList = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const userId = req.params.userId
            const contentId = req.params.contentId
            if(!userId || !contentId){
                throw new HttpException(422,"User Id and content Id is Required")
            }
            const data = await this.userService.addToList(userId,contentId)
            const resp: ApiResponse = new ApiResponse({
                success: true,
                message: "Operation successful",
                data: data
            });
            res.status(200).json(resp);
        } catch (error) {
            next(error);
        }
    };


    public removeFromList = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {
        try {
            const userId = req.params.userId
            const contentId = req.params.contentId
            if(!userId || !contentId){
                throw new HttpException(422,"User Id and content Id is Required")
            }
            const data = await this.userService.removeFromList(userId,contentId)
            const resp: ApiResponse = new ApiResponse({
                success: true,
                message: "Operation successful",
                data: data
            });
            res.status(200).json(resp);
        } catch (error) {
            next(error);
        }
    };
}

export default UserController;
