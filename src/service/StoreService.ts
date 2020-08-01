import StoreRepositoryInterface from "../repositories/contracts/StoreRepositoryInterface";
import NotFoundException from "../exceptions/NotFoundException";
import ProductRepositoryInterface from "../repositories/contracts/ProductRepositoryInterface";
import StoreStock from "../types/StoreStock";

class StoreService {

    constructor(
        private readonly repository: StoreRepositoryInterface,
        private readonly productRepository: ProductRepositoryInterface
    ) {
        this.repository = repository;
        this.productRepository = productRepository;
    }

    decrementQuantityByProductIdAndStoreId(
        productId: number, storeId: number, quantity: number
    ): Promise<any> {
        return this.productRepository.decrementQuantityByProductIdAndStoreId(
            productId, storeId, quantity
        );
    }

    async findStoresHasInStockProductOfClient(productId: number, clientId: number): Promise<StoreStock[]> { 
        return this.repository.findStoresHasInStockProductOfClient(productId, clientId);
    }
     
    getQuantityProductInStockOneStore(productId: number, storeId: number) {
        return this.productRepository
        .getQuantityByProductIdAndStoreId(productId, storeId);
    }

    findAllProductsByStoreId(storeId: any) {
        return this.productRepository.findAllByStoreId(storeId);
    }

    async findProductById(id: any) {
        const product = await this.productRepository.findById(id);
        const isNull = product.length == 0;
        if (isNull) {
            throw new NotFoundException("Produto não encontrado!");
        }
 
        return product[0];
    }

    async createProduct(newProduct: { [key: string]: any }) {
        return this.productRepository.create(newProduct);
    }
 
    async deleteProduct(id: any) {
        await this.findProductById(id);
        return this.productRepository.delete(id);
    }

    async updateProduct(id: any, storeId: any, datasModified: { [key: string]: any }) {
        await this.findProductById(id);
        return this.productRepository
                        .updateProductAndStoreProduct(id, storeId, datasModified);
    }
    

    findAll() {
        return this.repository.findAll([], {});
    }

    async findById(id: any) {
        const store = await this.repository.findById(id);
        const isNull = store.length == 0;
        if (isNull) {
            throw new NotFoundException("Loja não foi encontrado!");
        }
        return store;
    }

    create(newRegister: { [key: string]: any}) {
        return this.repository.create(newRegister);
    }

    async delete(id: number) {
        await this.findById(id);
        return this.repository.delete(id);
    }

    async update(id: number, datasModified: { [key: string]: any }) {
        await this.findById(id);
        return this.repository.update(id, datasModified);
    }

}

export default StoreService;