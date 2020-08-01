import { Request, Response, NextFunction } from "express";
import Joi from "@hapi/joi";
import Endpoint from "./Endpoint";
import StoreService from "../service/StoreService";
import ClientService from "../service/ClientService";

class ProductEndpoint extends Endpoint {

    constructor(
        private readonly service: StoreService,
        private readonly clientService: ClientService
    ) {
        super();
        this.service = this.service;
        this.clientService = this.clientService;
        this.findAll = this.findAll.bind(this);
        this.findById = this.findById.bind(this);
        this.create = this.create.bind(this);
        this.update = this.update.bind(this);
        this.delete = this.delete.bind(this);
    }

    protected getRulesValidation(): { [key: string]: any; } {
        return Joi.object({
            name: Joi.string().min(2).max(255).required(),
            description: Joi.string().min(2).max(255).required(),
            price: Joi.number().required(),
            store_id: Joi.number().required(),
            quantity: Joi.number().min(1).required()
        });
    }

    async findAll(request: Request, response: Response, next: NextFunction) {
        try {
            const clientId = request.params.clientId;
            const storeId = request.params.storeId;
            await this.clientService.findById(clientId);
            await this.service.findById(storeId);
            const products = await this.service.findAllProductsByStoreId(storeId);
            return response.json(products); 
        } catch (error) {
            next(error); 
        }
    }

    async findById(request: Request, response: Response, next: NextFunction) {
        try {
            const clientId = request.params.clientId;
            const storeId = request.params.storeId;
            const productId = request.params.productId;

            await this.clientService.findById(clientId);
            await this.service.findById(storeId);
            const product =  await this.service.findProductById(productId);
            return response.json(product);
        } catch (error) { 
            next(error);
        }
    }

    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const clientId = request.params.clientId;
            const storeId = request.params.storeId;
            const newProduct = request.body;
            newProduct.store_id = storeId;

            await this.clientService.findById(clientId);
            await this.service.findById(storeId);
            this.isValidDatas(newProduct);
            await this.service.createProduct(newProduct);
            return response.sendStatus(201);
        } catch (error) {
            next(error);
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {
        try {
            const clientId = request.params.clientId;
            const storeId = request.params.storeId;
            const productId = request.params.productId;
            const datasModified = request.body;

            await this.clientService.findById(clientId);
            await this.service.findById(storeId);
            await this.service.updateProduct(productId, storeId, datasModified);
            return response.sendStatus(204);
        } catch (error) {
            next(error);
        }
    }

    async delete(request: Request, response: Response, next: NextFunction) {
        try {
            const clientId = request.params.clientId;
            const storeId = request.params.storeId;
            const productId = request.params.productId;

            await this.clientService.findById(clientId);
            await this.service.findById(storeId);
            await this.service.deleteProduct(productId);
            return response.sendStatus(204);
        } catch (error) {
            next(error);
        }
    }
}

export default ProductEndpoint;