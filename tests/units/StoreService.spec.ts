import StoreService from "../../src/service/StoreService";
import StoreRepository from "../../src/repositories/StoreRepository";
import ProductRepository from "../../src/repositories/ProductRepository";
import NotFoundException from "../../src/exceptions/NotFoundException";

jest.mock("../../src/repositories/StoreRepository");
jest.mock("../../src/repositories/ProductRepository");


describe("Unit tests class StoreService", () => {

    it("Should return 2 clients when method findAll called", async () => {
        const ProductRepositoryMocked = <jest.Mock<ProductRepository>>ProductRepository;
        const productRepositoryMocked = <jest.Mocked<ProductRepository>>new ProductRepositoryMocked();

        const StoreRepositoryMocked = <jest.Mock<StoreRepository>>StoreRepository;
        const storeRepositoryMocked = <jest.Mocked<StoreRepository>>new StoreRepositoryMocked();

        storeRepositoryMocked.findAll.mockResolvedValue([
            {
                id: 1, name: "Store 1"
            },
            {
                id: 2, name: "Store 2"
            }
        ])
        const storeService = new StoreService(storeRepositoryMocked, productRepositoryMocked);
        const clientsReturned = await storeService.findAll();
        expect(2).toBe(clientsReturned.length);
    });

    it("Should get store when method findById called", async () => {
        const ProductRepositoryMocked = <jest.Mock<ProductRepository>>ProductRepository;
        const productRepositoryMocked = <jest.Mocked<ProductRepository>>new ProductRepositoryMocked();

        const StoreRepositoryMocked = <jest.Mock<StoreRepository>>StoreRepository;
        const storeRepositoryMocked = <jest.Mocked<StoreRepository>>new StoreRepositoryMocked();

        storeRepositoryMocked.findById.mockResolvedValue(
            {
                id: 1, name: "Store 1"
            }
        )
        const storeService = new StoreService(storeRepositoryMocked, productRepositoryMocked);
        const clientsReturned = await storeService.findById(1);
        expect({
            id: 1, name: "Store 1"
        }).toMatchObject(clientsReturned);
    });

    it("Should trigger exception when method findById called and return no exist", async () => {
        try {
            const ProductRepositoryMocked = <jest.Mock<ProductRepository>>ProductRepository;
            const productRepositoryMocked = <jest.Mocked<ProductRepository>>new ProductRepositoryMocked();

            const StoreRepositoryMocked = <jest.Mock<StoreRepository>>StoreRepository;
            const storeRepositoryMocked = <jest.Mocked<StoreRepository>>new StoreRepositoryMocked();

            storeRepositoryMocked.findById.mockResolvedValue([])
            const storeService = new StoreService(storeRepositoryMocked, productRepositoryMocked);
            await storeService.findById(1);
        } catch (error) {
            expect(NotFoundException.name).toBe(error.name);
        }
    });

    it("Should execute method delete called to the try delete store", async () => {
        const ProductRepositoryMocked = <jest.Mock<ProductRepository>>ProductRepository;
        const productRepositoryMocked = <jest.Mocked<ProductRepository>>new ProductRepositoryMocked();

        const StoreRepositoryMocked = <jest.Mock<StoreRepository>>StoreRepository;
        const storeRepositoryMocked = <jest.Mocked<StoreRepository>>new StoreRepositoryMocked();

        storeRepositoryMocked.findById.mockResolvedValue(
            {
                id: 1, name: "Store 1"
            }
        )
        const storeService = new StoreService(storeRepositoryMocked, productRepositoryMocked);
        await storeService.delete(1);
        expect(storeRepositoryMocked.delete.call.length).toBe(1);
    });

    it("Should trigger exception to the try delete store not exist", async () => {
        try {
            const ProductRepositoryMocked = <jest.Mock<ProductRepository>>ProductRepository;
            const productRepositoryMocked = <jest.Mocked<ProductRepository>>new ProductRepositoryMocked();

            const StoreRepositoryMocked = <jest.Mock<StoreRepository>>StoreRepository;
            const storeRepositoryMocked = <jest.Mocked<StoreRepository>>new StoreRepositoryMocked();

            storeRepositoryMocked.findById.mockResolvedValue([])
            const storeService = new StoreService(storeRepositoryMocked, productRepositoryMocked);
            await storeService.delete(1);
        } catch (error) {
            expect(NotFoundException.name).toBe(error.name);
        }
    });

    it("Should trigger exception to the try update client datas not exist", async () => {
        try {
            const ProductRepositoryMocked = <jest.Mock<ProductRepository>>ProductRepository;
            const productRepositoryMocked = <jest.Mocked<ProductRepository>>new ProductRepositoryMocked();

            const StoreRepositoryMocked = <jest.Mock<StoreRepository>>StoreRepository;
            const storeRepositoryMocked = <jest.Mocked<StoreRepository>>new StoreRepositoryMocked();

            storeRepositoryMocked.findById.mockResolvedValue([])
            const storeService = new StoreService(storeRepositoryMocked, productRepositoryMocked);
            await storeService.update(1, {});
        } catch (error) {
            expect(NotFoundException.name).toBe(error.name);
        }
    });

    it("Should do update store datas to the method update called", async () => {
        const ProductRepositoryMocked = <jest.Mock<ProductRepository>>ProductRepository;
        const productRepositoryMocked = <jest.Mocked<ProductRepository>>new ProductRepositoryMocked();

        const StoreRepositoryMocked = <jest.Mock<StoreRepository>>StoreRepository;
        const storeRepositoryMocked = <jest.Mocked<StoreRepository>>new StoreRepositoryMocked();

        storeRepositoryMocked.findById.mockResolvedValue(
            {
                id: 1, name: "Store 1"
            }
        )
        const storeService = new StoreService(storeRepositoryMocked, productRepositoryMocked);
        await storeService.update(1, {});
        expect(storeRepositoryMocked.update.call.length).toBe(1);
    });

    it("Should return list products in one store", async () => {
        const ProductRepositoryMocked = <jest.Mock<ProductRepository>>ProductRepository;
        const productRepositoryMocked = <jest.Mocked<ProductRepository>>new ProductRepositoryMocked();

        productRepositoryMocked.findAllByStoreId.mockResolvedValue([
            {
                "id": 3,
                "name": "Samsung",
                "description": "Samsung",
                "price": "1500.50",
                "product_id": 3,
                "store_id": 3,
                "quantity": 30
            }
        ])
        const StoreRepositoryMocked = <jest.Mock<StoreRepository>>StoreRepository;
        const storeRepositoryMocked = <jest.Mocked<StoreRepository>>new StoreRepositoryMocked();

        const storeService = new StoreService(storeRepositoryMocked, productRepositoryMocked);
        const productsReturned = await storeService.findAllProductsByStoreId(1);
        expect(1).toBe(productsReturned.length);
    });

    it("Should get products by id", async () => {
        const ProductRepositoryMocked = <jest.Mock<ProductRepository>>ProductRepository;
        const productRepositoryMocked = <jest.Mocked<ProductRepository>>new ProductRepositoryMocked();

        productRepositoryMocked.findById.mockResolvedValue(
            [{
                "id": 3,
                "name": "Samsung",
                "description": "Samsung",
                "price": "1500.50",
                "product_id": 3,
                "store_id": 3,
                "quantity": 30
            }]
        );

        const StoreRepositoryMocked = <jest.Mock<StoreRepository>>StoreRepository;
        const storeRepositoryMocked = <jest.Mocked<StoreRepository>>new StoreRepositoryMocked();

        const storeService = new StoreService(storeRepositoryMocked, productRepositoryMocked);
        const productsReturned = await storeService.findProductById(1);
        expect({
            "id": 3,
            "name": "Samsung",
            "description": "Samsung",
            "price": "1500.50",
            "product_id": 3,
            "store_id": 3,
            "quantity": 30
        }).toMatchObject(productsReturned);
    });

    it("Should trigger exception when get products by id and product not exist", async () => {
        try {
            const ProductRepositoryMocked = <jest.Mock<ProductRepository>>ProductRepository;
            const productRepositoryMocked = <jest.Mocked<ProductRepository>>new ProductRepositoryMocked();

            productRepositoryMocked.findById.mockResolvedValue([]);

            const StoreRepositoryMocked = <jest.Mock<StoreRepository>>StoreRepository;
            const storeRepositoryMocked = <jest.Mocked<StoreRepository>>new StoreRepositoryMocked();

            const storeService = new StoreService(storeRepositoryMocked, productRepositoryMocked);
            await storeService.findProductById(1);
        } catch (error) {
            expect(NotFoundException.name).toBe(error.name);
        }
    });

    it("Should trigger exception when try delete product by id and product not exist", async () => {
        try {
            const ProductRepositoryMocked = <jest.Mock<ProductRepository>>ProductRepository;
            const productRepositoryMocked = <jest.Mocked<ProductRepository>>new ProductRepositoryMocked();

            productRepositoryMocked.findById.mockResolvedValue([]);

            const StoreRepositoryMocked = <jest.Mock<StoreRepository>>StoreRepository;
            const storeRepositoryMocked = <jest.Mocked<StoreRepository>>new StoreRepositoryMocked();

            const storeService = new StoreService(storeRepositoryMocked, productRepositoryMocked);
            await storeService.deleteProduct(1);
        } catch (error) {
            expect(NotFoundException.name).toBe(error.name);
        }
    });

    it("Should called method deleteProduct with success", async () => {
            const ProductRepositoryMocked = <jest.Mock<ProductRepository>>ProductRepository;
            const productRepositoryMocked = <jest.Mocked<ProductRepository>>new ProductRepositoryMocked();

            productRepositoryMocked.findById.mockResolvedValue([
                {
                    "id": 3,
                    "name": "Samsung",
                    "description": "Samsung",
                    "price": "1500.50",
                    "product_id": 3,
                    "store_id": 3,
                    "quantity": 30
                }
            ]);

            const StoreRepositoryMocked = <jest.Mock<StoreRepository>>StoreRepository;
            const storeRepositoryMocked = <jest.Mocked<StoreRepository>>new StoreRepositoryMocked();

            const storeService = new StoreService(storeRepositoryMocked, productRepositoryMocked);
            await storeService.deleteProduct(1);
            expect(productRepositoryMocked.delete.call.length).toBe(1); 
       
    });

    it("Should trigger exception when try update data's product and product not exist", async () => {
        try {
            const ProductRepositoryMocked = <jest.Mock<ProductRepository>>ProductRepository;
            const productRepositoryMocked = <jest.Mocked<ProductRepository>>new ProductRepositoryMocked();

            productRepositoryMocked.findById.mockResolvedValue([]);

            const StoreRepositoryMocked = <jest.Mock<StoreRepository>>StoreRepository;
            const storeRepositoryMocked = <jest.Mocked<StoreRepository>>new StoreRepositoryMocked();

            const storeService = new StoreService(storeRepositoryMocked, productRepositoryMocked);
            await storeService.updateProduct(1, 1, {});
        } catch (error) {
            expect(NotFoundException.name).toBe(error.name);
        }
    });

    it("Should called method deleteProduct with success", async () => {
            const ProductRepositoryMocked = <jest.Mock<ProductRepository>>ProductRepository;
            const productRepositoryMocked = <jest.Mocked<ProductRepository>>new ProductRepositoryMocked();

            productRepositoryMocked.findById.mockResolvedValue([
                {
                    "id": 3,
                    "name": "Samsung",
                    "description": "Samsung",
                    "price": "1500.50",
                    "product_id": 3,
                    "store_id": 3,
                    "quantity": 30
                }
            ]);

            const StoreRepositoryMocked = <jest.Mock<StoreRepository>>StoreRepository;
            const storeRepositoryMocked = <jest.Mocked<StoreRepository>>new StoreRepositoryMocked();

            const storeService = new StoreService(storeRepositoryMocked, productRepositoryMocked);
            await storeService.updateProduct(1, 1, {});
            expect(productRepositoryMocked.updateProductAndStoreProduct.call.length).toBe(1); 
       
    });
});