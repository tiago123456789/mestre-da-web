import ClientRepositoryInterface from "../repositories/contracts/ClientRepositoryInterface";
import NotFoundException from "../exceptions/NotFoundException";

class ClientService {

    constructor(private readonly repository: ClientRepositoryInterface) {
        this.repository = repository;
    }

    findAll() {
        return this.repository.findAll([], {});
    }

    async findById(id: any) {
        const point = await this.repository.findById(id);
        const isNull = point.length == 0;
        if (isNull) {
            throw new NotFoundException("Cliente não foi encontrado!");
        }
        return point;
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

export default ClientService;