import { Request, Response, NextFunction } from "express";
import Joi from "@hapi/joi";
import Endpoint from "./Endpoint";
import OrderService from "../service/OrderService";

class OrderEndpoint extends Endpoint {

    constructor(
        private readonly service: OrderService,
    ) {
        super();
        this.service = this.service;
        this.create = this.create.bind(this);
    }

    protected getRulesValidation(): { [key: string]: any; } {
        return Joi.object({
            storeId: Joi.number().required(),
            productId: Joi.number().required(),
            clientId: Joi.number().required(),
            quantity: Joi.number().min(1).required()
        });
    }
    
    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const newRegister = request.body;
            this.isValidDatas(newRegister);
            await this.service.create(newRegister);
            return response.sendStatus(201);
        } catch (error) {
            next(error);
        }
    }
}

export default OrderEndpoint;