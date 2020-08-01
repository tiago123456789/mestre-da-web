import Repository from "./Repository";
import StoreStock from "../types/StoreStock";
import StoreRepositoryInterface from "./contracts/StoreRepositoryInterface";

class StoreRepository extends Repository implements StoreRepositoryInterface {

    constructor() {
        super("stores");
    }

    async findStoresHasInStockProductOfClient(productId: number, clientId: number): Promise<StoreStock[]> {
        const registers = await this.getConnection()("stores_products")
        .innerJoin("stores", function() {
            this.on("stores.id", "=", "stores_products.store_id")
        })
        .where("stores_products.product_id", productId)
        .andWhere("stores_products.quantity", ">", 0)
        .andWhere("stores.client_id", clientId);

        return registers.map(register => {
            return {
                productId: register.product_id,
                storeId: register.store_id,
                quantity: register.quantity
            }
        })
    }

};

export default StoreRepository;