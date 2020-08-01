import StoreStock from "../../types/StoreStock";

interface StoreRepositoryInterface {

    findAll(columns: Array<string>, conditions: { [key: string]: any }): Promise<any>;
    findById(id: number): Promise<any>;
    create(newRegister: { [key: string]: any } ): Promise<any>;
    delete(id: number): Promise<any>;
    update(id: number, datasModified: { [key: string]: any }): Promise<any>;
    findStoresHasInStockProductOfClient(productId: number, clientId: number): Promise<StoreStock[]>;
}

export default StoreRepositoryInterface;