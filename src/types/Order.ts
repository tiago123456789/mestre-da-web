export default interface Order {

    productId: number;
    storeId: number;
    clientId: number;
    quantity: number;
    enableGetProductInStockAnotherStores?: boolean;
}