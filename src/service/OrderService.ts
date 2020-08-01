import StoreService from "./StoreService";
import Order from "../types/Order";
import LogicNegociationException from "../exceptions/LogicNegociation";
import OrderRepositoryInterface from "../repositories/contracts/OrderRepositoryInterface";
import StoreStock from "../types/StoreStock";
import ClientService from "./ClientService";

class OrderService {

    constructor(
        private readonly repository: OrderRepositoryInterface,
        private readonly storeService: StoreService,
        private readonly clientService: ClientService,
    ) { }


    async create(order: Order) {
        await this.clientService.findById(order.clientId);
        await this.storeService.findById(order.storeId);
        await this.storeService.findProductById(order.productId);

        const quantityInStock = await this.storeService.getQuantityProductInStockOneStore(
            order.productId, order.storeId
        );
        const isQuantityInStockMoreGreatherThanOrEqualQuantityOrder = quantityInStock >= order.quantity;
        const isProductUnavabilityInStoreStock = (
            !isQuantityInStockMoreGreatherThanOrEqualQuantityOrder
            && !order.enableGetProductInStockAnotherStores == true
        );

        if (isProductUnavabilityInStoreStock) {
            throw new LogicNegociationException("Desculpe, mas o produto que você selecionou com essa quantidade não está disponível no estoque!")
        } else if (
            !isQuantityInStockMoreGreatherThanOrEqualQuantityOrder
            && order.enableGetProductInStockAnotherStores) {

            let productsInStockStores: Array<StoreStock> = await this.storeService.findStoresHasInStockProductOfClient(
                order.productId, order.clientId
            );

            const isTotalProductInStores = productsInStockStores
                .map(item => item.quantity)
                .reduce((previous: number, current) => previous += current);

            const isQuantityInStockMoreGreatherThanOrEqualQuantityOrder = isTotalProductInStores >= order.quantity;
            if (!isQuantityInStockMoreGreatherThanOrEqualQuantityOrder) {
                throw new LogicNegociationException("Desculpe, mas o produto que você selecionou com essa quantidade não está disponível no estoque!")
            }

            if (quantityInStock) {
                await this.repository.create({
                    quantity_selled: quantityInStock,
                    store_id: order.storeId,
                    product_id: order.productId
                });
    
                await this.storeService.decrementQuantityByProductIdAndStoreId(
                    order.productId, order.storeId, quantityInStock
                );
    
                order.quantity -= quantityInStock;
            }
           
            return productsInStockStores.map(async (item: StoreStock) => {
                if (item.productId == order.productId && item.storeId == order.storeId) {
                    return;
                }
                const isQuantityStockLessThanOrderQuantity = item.quantity < order.quantity;
                const quantity = isQuantityStockLessThanOrderQuantity ? item.quantity : order.quantity;

                if (order.quantity <= 0) {
                    return;
                }

                await this.repository.create({
                    quantity_selled: quantity,
                    store_id: item.storeId,
                    product_id: item.productId
                });

                await this.storeService.decrementQuantityByProductIdAndStoreId(
                    item.productId, item.storeId, quantity
                );
                
                order.quantity -= quantity;
            });
        }


        await this.repository.create({
            quantity_selled: order.quantity,
            store_id: order.storeId,
            product_id: order.productId
        });

        return this.storeService.decrementQuantityByProductIdAndStoreId(
            order.productId, order.storeId, order.quantity
        );
    }
}

export default OrderService;