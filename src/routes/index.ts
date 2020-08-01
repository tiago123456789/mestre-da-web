import { Express, Request, Response } from "express";
import handlerExceptionMiddleware from "../middleware/HandlerExceptionMiddleware";
import ClientEnpointFactory from "../factories/endpoints/ClientEnpointFactory";
import StoreEndpointFactory from "../factories/endpoints/StoreEndpointFactory";
import ProductEndpointFactory from "../factories/endpoints/ProductEndpointFactory";
import OrderEndpointFactory from "../factories/endpoints/OrderEnpointFactory";


const clientEnpoint = new ClientEnpointFactory().make();
const storeEndpoint = new StoreEndpointFactory().make();
const productEndpoint = new ProductEndpointFactory().make();
const orderEndpoint = new OrderEndpointFactory().make();

export default (app: Express) => {

    app.get("/clients", clientEnpoint.findAll);
    app.get("/clients/:id", clientEnpoint.findById);
    app.delete("/clients/:id", clientEnpoint.delete);
    app.put("/clients/:id", clientEnpoint.update);
    app.post("/clients", clientEnpoint.create);

    app.get("/clients/:clientId/stores/:storeId/products", productEndpoint.findAll);
    app.get("/clients/:clientId/stores/:storeId/products/:productId", productEndpoint.findById);
    app.post("/clients/:clientId/stores/:storeId/products", productEndpoint.create);
    app.delete("/clients/:clientId/stores/:storeId/products/:productId", productEndpoint.delete);
    app.put("/clients/:clientId/stores/:storeId/products/:productId", productEndpoint.update);

    app.get("/clients/:clientId/stores", storeEndpoint.findAll);
    app.get("/clients/:clientId/stores/:id", storeEndpoint.findById);
    app.post("/clients/:clientId/stores", storeEndpoint.create);
    app.delete("/clients/:clientId/stores/:id", storeEndpoint.delete);
    app.put("/clients/:clientId/stores/:id", storeEndpoint.update);

    app.post("/orders", orderEndpoint.create);
    
    // Setting middleware handler exceptions application.
    app.use(handlerExceptionMiddleware);
}