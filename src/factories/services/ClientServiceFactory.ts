import FactoryInterface from "./../contracts/FactoryInterface"
import ClientService from "../../service/ClientService";
import { Client } from "knex";
import ClientRepository from "../../repositories/ClientRepository";


export default class ClientServiceFactory implements FactoryInterface<ClientService> {

    make(): ClientService {
        const repository = new ClientRepository();
        return new ClientService(repository);
    }

}
