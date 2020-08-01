import Repository from "./Repository";
import ClientRepositoryInterface from "./contracts/ClientRepositoryInterface";

class ClientRepository extends Repository implements ClientRepositoryInterface {

    constructor() {
        super("clients");
    }

};

export default ClientRepository;