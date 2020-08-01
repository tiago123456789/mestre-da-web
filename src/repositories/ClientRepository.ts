import Repository from "./Repository";
import ClientRepositoryInterface from "./contracts/ClientRepositoryInterface";
import { Transaction } from "knex";

class ClientRepository extends Repository implements ClientRepositoryInterface {

    constructor() {
        super("clients");
    }

};

export default ClientRepository;