import StoreService from "../../src/service/StoreService";
import OrderRepository from "../../src/repositories/OrderRepository";
import OrderService from "../../src/service/OrderService";
import ClientService from "../../src/service/ClientService";
import ClientRepository from "../../src/repositories/ClientRepository";
import NotFoundException from "../../src/exceptions/NotFoundException";
import StoreRepository from "../../src/repositories/StoreRepository";
import ProductRepository from "../../src/repositories/ProductRepository";
import LogicNegociationException from "../../src/exceptions/LogicNegociation";

jest.mock("../../src/repositories/StoreRepository");
jest.mock("../../src/repositories/ProductRepository");
jest.mock("../../src/repositories/OrderRepository");
jest.mock("../../src/repositories/ClientRepository");

describe("Unit tests class storeService", () => {

    it("Should trigger exception when client not exist", async () => {
        try {
            const OrderRepositoryMocked = <jest.Mock<OrderRepository>>OrderRepository;
            const orderRepositoryMocked = <jest.Mocked<OrderRepository>>new OrderRepositoryMocked();

            const StoreServiceMocked = <jest.Mock<StoreService>>StoreService;
            const storeServiceMocked = <jest.Mocked<StoreService>>new StoreServiceMocked();

            const ClientRepositoryMocked = <jest.Mock<ClientRepository>>ClientRepository;
            const clientRepositoryMocked = <jest.Mocked<ClientRepository>>new ClientRepositoryMocked();
            const clientService = new ClientService(clientRepositoryMocked);

            clientRepositoryMocked.findById.mockResolvedValue([]);
            const orderService = new OrderService(
                orderRepositoryMocked, storeServiceMocked, clientService);
            await orderService.create({
                productId: 1,
                storeId: 1,
                clientId: 1,
                quantity: 1
            })
        } catch (error) {
            expect(NotFoundException.name).toBe(error.name);
        }
    });

    it("Should trigger exception when store not exist", async () => {
        try {
            const OrderRepositoryMocked = <jest.Mock<OrderRepository>>OrderRepository;
            const orderRepositoryMocked = <jest.Mocked<OrderRepository>>new OrderRepositoryMocked();

            const ProductRepositoryMocked = <jest.Mock<ProductRepository>>ProductRepository;
            const productRepositoryMocked = <jest.Mocked<ProductRepository>>new ProductRepositoryMocked();

            const StoreRepositoryMocked = <jest.Mock<StoreRepository>>StoreRepository;
            const storeRepositoryMocked = <jest.Mocked<StoreRepository>>new StoreRepositoryMocked();
            const storeService = new StoreService(storeRepositoryMocked, productRepositoryMocked)

            const ClientRepositoryMocked = <jest.Mock<ClientRepository>>ClientRepository;
            const clientRepositoryMocked = <jest.Mocked<ClientRepository>>new ClientRepositoryMocked();
            const clientService = new ClientService(clientRepositoryMocked);

            clientRepositoryMocked.findById.mockResolvedValue([
                {
                    id: 1, name: "Client test"
                }
            ]);
            storeRepositoryMocked.findById.mockResolvedValue([]);

            const orderService = new OrderService(
                orderRepositoryMocked, storeService, clientService);
            await orderService.create({
                productId: 1,
                storeId: 1,
                clientId: 1,
                quantity: 1
            })
        } catch (error) {
            expect(NotFoundException.name).toBe(error.name);
        }
    });

    it("Should trigger exception when product not exist", async () => {
        try {
            const OrderRepositoryMocked = <jest.Mock<OrderRepository>>OrderRepository;
            const orderRepositoryMocked = <jest.Mocked<OrderRepository>>new OrderRepositoryMocked();

            const ProductRepositoryMocked = <jest.Mock<ProductRepository>>ProductRepository;
            const productRepositoryMocked = <jest.Mocked<ProductRepository>>new ProductRepositoryMocked();

            const StoreRepositoryMocked = <jest.Mock<StoreRepository>>StoreRepository;
            const storeRepositoryMocked = <jest.Mocked<StoreRepository>>new StoreRepositoryMocked();
            const storeService = new StoreService(storeRepositoryMocked, productRepositoryMocked)

            const ClientRepositoryMocked = <jest.Mock<ClientRepository>>ClientRepository;
            const clientRepositoryMocked = <jest.Mocked<ClientRepository>>new ClientRepositoryMocked();
            const clientService = new ClientService(clientRepositoryMocked);

            clientRepositoryMocked.findById.mockResolvedValue([
                {
                    id: 1, name: "Client test"
                }
            ]);
            storeRepositoryMocked.findById.mockResolvedValue([
                { id: 1, name: "Store test" }
            ]);

            productRepositoryMocked.findById.mockResolvedValue([])

            const orderService = new OrderService(
                orderRepositoryMocked, storeService, clientService);
            await orderService.create({
                productId: 1,
                storeId: 1,
                clientId: 1,
                quantity: 1
            })
        } catch (error) {
            expect(NotFoundException.name).toBe(error.name);
        }
    });

    it("Should trigger exception when quantity mencionated more than quantity product in stock", async () => {
        try {
            const OrderRepositoryMocked = <jest.Mock<OrderRepository>>OrderRepository;
            const orderRepositoryMocked = <jest.Mocked<OrderRepository>>new OrderRepositoryMocked();

            const ProductRepositoryMocked = <jest.Mock<ProductRepository>>ProductRepository;
            const productRepositoryMocked = <jest.Mocked<ProductRepository>>new ProductRepositoryMocked();

            const StoreRepositoryMocked = <jest.Mock<StoreRepository>>StoreRepository;
            const storeRepositoryMocked = <jest.Mocked<StoreRepository>>new StoreRepositoryMocked();
            const storeService = new StoreService(storeRepositoryMocked, productRepositoryMocked)

            const ClientRepositoryMocked = <jest.Mock<ClientRepository>>ClientRepository;
            const clientRepositoryMocked = <jest.Mocked<ClientRepository>>new ClientRepositoryMocked();
            const clientService = new ClientService(clientRepositoryMocked);

            clientRepositoryMocked.findById.mockResolvedValue([
                {
                    id: 1, name: "Client test"
                }
            ]);
            storeRepositoryMocked.findById.mockResolvedValue([
                { id: 1, name: "Store test" }
            ]);

            productRepositoryMocked.findById.mockResolvedValue([
                {
                    "id": 3,
                    "name": "Samsung",
                    "description": "Samsung",
                    "price": "1500.50",
                    "product_id": 3,
                    "store_id": 3,
                    "quantity": 5
                }
            ]);

            productRepositoryMocked.getQuantityByProductIdAndStoreId.mockResolvedValue(5);

            const orderService = new OrderService(
                orderRepositoryMocked, storeService, clientService);
            await orderService.create({
                productId: 1,
                storeId: 1,
                clientId: 1,
                quantity: 10
            })
        } catch (error) {
            expect(LogicNegociationException.name).toBe(error.name);
        }
    });

    it("Should create order with succes", async () => {
        const OrderRepositoryMocked = <jest.Mock<OrderRepository>>OrderRepository;
        const orderRepositoryMocked = <jest.Mocked<OrderRepository>>new OrderRepositoryMocked();

        const ProductRepositoryMocked = <jest.Mock<ProductRepository>>ProductRepository;
        const productRepositoryMocked = <jest.Mocked<ProductRepository>>new ProductRepositoryMocked();

        const StoreRepositoryMocked = <jest.Mock<StoreRepository>>StoreRepository;
        const storeRepositoryMocked = <jest.Mocked<StoreRepository>>new StoreRepositoryMocked();
        const storeService = new StoreService(storeRepositoryMocked, productRepositoryMocked)

        const ClientRepositoryMocked = <jest.Mock<ClientRepository>>ClientRepository;
        const clientRepositoryMocked = <jest.Mocked<ClientRepository>>new ClientRepositoryMocked();
        const clientService = new ClientService(clientRepositoryMocked);

        clientRepositoryMocked.findById.mockResolvedValue([
            {
                id: 1, name: "Client test"
            }
        ]);
        storeRepositoryMocked.findById.mockResolvedValue([
            { id: 1, name: "Store test" }
        ]);

        productRepositoryMocked.findById.mockResolvedValue([
            {
                "id": 3,
                "name": "Samsung",
                "description": "Samsung",
                "price": "1500.50",
                "product_id": 3,
                "store_id": 3,
                "quantity": 10
            }
        ]);

        productRepositoryMocked.getQuantityByProductIdAndStoreId.mockResolvedValue(10);

        const orderService = new OrderService(
            orderRepositoryMocked, storeService, clientService);
        await orderService.create({
            productId: 1,
            storeId: 1,
            clientId: 1,
            quantity: 5
        })

        expect(productRepositoryMocked.create.call.length).toBe(1)
    });

});