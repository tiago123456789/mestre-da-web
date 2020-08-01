import FactoryInterface from "../contracts/FactoryInterface"
import OrderService from "../../service/OrderService";
import OrderRepository from "../../repositories/OrderRepository";
import StoreServiceFactory from "./../services/StoreServiceFactory";
import ClientServiceFactory from "./ClientServiceFactory";


export default class OrderServiceFactory implements FactoryInterface<OrderService> {

    make(): OrderService {
        const repository = new OrderRepository();
        const storeService = new StoreServiceFactory().make();
        const clientService = new ClientServiceFactory().make();
        return new OrderService(repository, storeService, clientService);
    }

}
