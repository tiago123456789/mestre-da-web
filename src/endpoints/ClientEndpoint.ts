import { Request, Response, NextFunction } from "express";
import Joi from "@hapi/joi";
import PointService from "../service/ClientService";
import Endpoint from "./Endpoint";

class ClientEndpoint extends Endpoint {
    
    constructor(
        private readonly service: PointService,
    ) {
        super();
        this.service = this.service;
        this.create = this.create.bind(this);
        this.findAll = this.findAll.bind(this);
        this.findById = this.findById.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    protected getRulesValidation(): { [key: string]: any; } {
        return Joi.object({
            name: Joi.string().min(2).max(255).required(),
        });
    }

    async findAll(request: Request, response: Response) {
        const clients = await this.service.findAll();
        return response.json(clients);
    }

    async findById(request: Request, response: Response, next: NextFunction) {
        try {
            const id = request.params.id;
            const item = await this.service.findById(Number(id));
            return response.json(item);
        } catch(error) {
            next(error);
        }
      
    }

    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const newRegister = request.body;
            this.isValidDatas(newRegister);
            await this.service.create(newRegister);
            return response.sendStatus(201);
        } catch(error) { 
            next(error);
        }
    } 

    async delete(request: Request, response: Response, next: NextFunction) {
        try {
            const id = request.params.id;
            await this.service.delete(+id);
            return response.sendStatus(204);
        } catch(error) { 
            next(error);
        }
    } 

    async update(request: Request, response: Response, next: NextFunction) {
        try {
            const id = request.params.id;
            const datasModified = request.body;
            await this.service.update(+id, datasModified);
            return response.sendStatus(204);
        } catch(error) { 
            next(error);
        }
    } 
}

export default ClientEndpoint;