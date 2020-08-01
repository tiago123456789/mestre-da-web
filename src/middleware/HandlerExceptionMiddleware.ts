import { NextFunction, Response, Request } from "express";

export default (error: Error, request: Request, response: Response, next: NextFunction) => {

    console.log(error);
    switch(error.name) {
        case "NotFoundException":
            return response.status(404).json({
                statusCode: 404,
                message: error.message
            });
        case "InvalidDatasException":
            return response.status(400).json({
                statusCode: 400,
                message: JSON.parse(error.message)
            });
        case "LogicNegociationException":
            return response.status(409).json({
                statusCode: 409,
                message: error.message
            });
        default: 
            return response.status(500).json({
                statusCode: 500,
                message: error.message
            });
    }
}