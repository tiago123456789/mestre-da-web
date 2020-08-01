import ClientService from "../../src/service/ClientService";
import ClientRepository from "../../src/repositories/ClientRepository";
import NotFoundException from "../../src/exceptions/NotFoundException";

jest.mock("../../src/repositories/ClientRepository");

describe("Unit tests class ClientService", () => {

    it("Should return 2 clients when method findAll called", async () => {
        const ClientRepositoryMocked = <jest.Mock<ClientRepository>>ClientRepository;
        const clientRepositoryMocked = <jest.Mocked<ClientRepository>>new ClientRepositoryMocked();

        clientRepositoryMocked.findAll.mockResolvedValue([
            {
                id: 1,
                name: "Client 1"
            },
            {
                id: 2,
                name: "Client 2"
            }
        ]);
        const clientService = new ClientService(clientRepositoryMocked);
        const clientsReturned = await clientService.findAll();
        expect(2).toBe(clientsReturned.length);
    });

    it("Should get client when method findById called passed id equal 1", async () => {
        const ClientRepositoryMocked = <jest.Mock<ClientRepository>>ClientRepository;
        const clientRepositoryMocked = <jest.Mocked<ClientRepository>>new ClientRepositoryMocked();
        clientRepositoryMocked.findById.mockResolvedValue(
            {
                id: 2,
                name: "Client 2"
            }
        );
        const clientService = new ClientService(clientRepositoryMocked);
        const clientsReturned = await clientService.findById(2);
        expect({
            id: 2,
            name: "Client 2"
        }).toMatchObject(clientsReturned);
    });

    it("Should trigger exception when method findById called and return no exist", async () => {
        try {
            const ClientRepositoryMocked = <jest.Mock<ClientRepository>>ClientRepository;
            const clientRepositoryMocked = <jest.Mocked<ClientRepository>>new ClientRepositoryMocked();
            clientRepositoryMocked.findById.mockResolvedValue([]);
            const clientService = new ClientService(clientRepositoryMocked);
            await clientService.findById(2);
        } catch (error) {
            expect(NotFoundException.name).toBe(error.name);
        }
    });

    it("Should execute method delete called to the try delete client", async () => {
        const ClientRepositoryMocked = <jest.Mock<ClientRepository>>ClientRepository;
        const clientRepositoryMocked = <jest.Mocked<ClientRepository>>new ClientRepositoryMocked();
        clientRepositoryMocked.findById.mockResolvedValue(
            {
                id: 2,
                name: "Client 2"
            }
        );
        const clientService = new ClientService(clientRepositoryMocked);
        await clientService.delete(2);
        expect(clientRepositoryMocked.delete.call.length).toBe(1);
    });

    it("Should trigger exception to the try delete client not exist", async () => {
        try {
            const ClientRepositoryMocked = <jest.Mock<ClientRepository>>ClientRepository;
            const clientRepositoryMocked = <jest.Mocked<ClientRepository>>new ClientRepositoryMocked();
            clientRepositoryMocked.findById.mockResolvedValue([]);
            const clientService = new ClientService(clientRepositoryMocked);
            await clientService.delete(2);
        } catch (error) {
            expect(NotFoundException.name).toBe(error.name);
        }
    });

    it("Should trigger exception to the try update client datas not exist", async () => {
        try {
            const ClientRepositoryMocked = <jest.Mock<ClientRepository>>ClientRepository;
            const clientRepositoryMocked = <jest.Mocked<ClientRepository>>new ClientRepositoryMocked();
            clientRepositoryMocked.findById.mockResolvedValue([]);
            const clientService = new ClientService(clientRepositoryMocked);
            await clientService.update(2, {});
        } catch (error) {
            expect(NotFoundException.name).toBe(error.name);
        }
    });

    it("Should do update client datas to the method update called", async () => {
        try {
            const ClientRepositoryMocked = <jest.Mock<ClientRepository>>ClientRepository;
            const clientRepositoryMocked = <jest.Mocked<ClientRepository>>new ClientRepositoryMocked();
            clientRepositoryMocked.findById.mockResolvedValue(
                {
                    id: 2,
                    name: "Client 2"
                }
            );
            const clientService = new ClientService(clientRepositoryMocked);
            await clientService.update(2, {});
        } catch (error) {
            expect(NotFoundException.name).toBe(error.name);
        }
    });
})