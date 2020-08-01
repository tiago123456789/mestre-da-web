import FactoryInterface from "./../contracts/FactoryInterface"
import StoreRepository from "../../repositories/StoreRepository";
import StoreService from "../../service/StoreService";
import ProductRepository from "../../repositories/ProductRepository";


export default class StoreServiceFactory implements FactoryInterface<StoreService> {

    make(): StoreService {
        const repository = new StoreRepository();
        const productRepository = new ProductRepository();
        return new StoreService(repository, productRepository);
    }

}
