import FactoryInterface from "../contracts/FactoryInterface"
import ProductEndpoint from "../../endpoints/ProductEndpoint";
import StoreServiceFactory from "./../services/StoreServiceFactory";
import ClientServiceFactory from "./../services/ClientServiceFactory";


export default class ProductEndpointFactory implements FactoryInterface<ProductEndpoint> {

    make(): ProductEndpoint {
        const service = new StoreServiceFactory().make()
        const clientService = new ClientServiceFactory().make();
        return new ProductEndpoint(service, clientService);
    }

}
