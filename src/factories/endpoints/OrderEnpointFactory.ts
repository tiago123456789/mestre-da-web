import FactoryInterface from "../contracts/FactoryInterface"
import OrderServiceFactory from "./../services/OrderServiceFactory";
import OrderEndpoint from "../../endpoints/OrderEndpoint";


export default class OrderEndpointFactory implements FactoryInterface<OrderEndpoint> {

    make(): OrderEndpoint {
        const service = new OrderServiceFactory().make();
        return new OrderEndpoint(service);
    }

}
