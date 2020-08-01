import FactoryInterface from "../contracts/FactoryInterface"
import ClientEndpoint from "../../endpoints/ClientEndpoint";
import ClientServiceFactory from "./../services/ClientServiceFactory";


export default class ClientEnpointFactory implements FactoryInterface<ClientEndpoint> {

    make(): ClientEndpoint {
        const service = new ClientServiceFactory().make();
        return new ClientEndpoint(service);
    }

}
