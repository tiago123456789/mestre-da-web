import Repository from "./Repository";
import OrderRepositoryInterface from "./contracts/OrderRepositoryInterface";

class OrderRepository extends Repository implements OrderRepositoryInterface {

    constructor() {
        super("orders");
    }

};

export default OrderRepository;