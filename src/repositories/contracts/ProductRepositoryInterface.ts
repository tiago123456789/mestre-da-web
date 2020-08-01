
interface ProductRepositoryInterface {

    findAll(columns: Array<string>, conditions: { [key: string]: any }): Promise<any>;
    findById(id: number): Promise<any>;
    create(newRegister: { [key: string]: any } ): Promise<any>;
    delete(id: number): Promise<any>;
    update(id: any, datasModified: { [key: string]: any }): Promise<any>;
    updateProductAndStoreProduct(id: any, storeId: any, datasModified: { [key: string]: any }): Promise<any>;
    findByName(name: string): any;
    findAllByStoreId(storeId: any): Promise<any>;
    getQuantityByProductIdAndStoreId(productId: number, storeId: number): Promise<any>;
    decrementQuantityByProductIdAndStoreId(productId: number, storeId: number,  quantity: number): Promise<any>;
}


export default ProductRepositoryInterface;