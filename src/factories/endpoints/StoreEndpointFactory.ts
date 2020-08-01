import FactoryInterface from "../contracts/FactoryInterface"
import StoreEndpoint from "../../endpoints/StoreEndpoint";
import StoreServiceFactory from "./../services/StoreServiceFactory";
import ClientServiceFactory from "./../services/ClientServiceFactory";


export default class StoreEndpointFactory implements FactoryInterface<StoreEndpoint> {

    make(): StoreEndpoint {
        const service = new StoreServiceFactory().make()
        const clientService = new ClientServiceFactory().make();
        return new StoreEndpoint(service, clientService);
    }

}
