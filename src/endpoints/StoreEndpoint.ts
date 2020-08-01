import { Request, Response, NextFunction } from "express";
import Joi from "@hapi/joi";
import Endpoint from "./Endpoint";
import StoreService from "../service/StoreService";
import ClientService from "../service/ClientService";

class StoreEndpoint extends Endpoint {

    constructor(
        private readonly service: StoreService,
        private readonly clientService: ClientService
    ) {
        super();
        this.service = this.service;
        this.clientService = this.clientService;
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

    async findAll(request: Request, response: Response, next: NextFunction) {
        try {
            const clientId = request.params.clientId;
            await this.clientService.findById(clientId);
            const clients = await this.service.findAll();
            return response.json(clients);
        } catch (error) {
            next(error);
        }
    }

    async findById(request: Request, response: Response, next: NextFunction) {
        try {
            const clientId = request.params.clientId;
            await this.clientService.findById(clientId);
            const id = request.params.id;
            const item = await this.service.findById(Number(id));
            return response.json(item);
        } catch (error) {
            next(error);
        }

    }

    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const clientId = request.params.clientId;
            await this.clientService.findById(clientId);
            
            const newRegister = request.body;
            newRegister.client_id = clientId;

            this.isValidDatas(newRegister);
            await this.service.create(newRegister);
            return response.sendStatus(201);
        } catch (error) {
            next(error);
        }
    }

    async delete(request: Request, response: Response, next: NextFunction) {
        try {
            const clientId = request.params.clientId;
            await this.clientService.findById(clientId);
            const id = request.params.id;
            await this.service.delete(+id);
            return response.sendStatus(204);
        } catch (error) {
            next(error);
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {
        try {
            const clientId = request.params.clientId;
            await this.clientService.findById(clientId);
           
            const id = request.params.id;
            const datasModified = request.body;
            datasModified.client_id = clientId;

            await this.service.update(+id, datasModified);
            return response.sendStatus(204);
        } catch (error) {
            next(error);
        }
    }
}

export default StoreEndpoint;