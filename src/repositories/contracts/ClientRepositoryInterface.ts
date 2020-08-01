import { Transaction } from "knex";

interface ClientRepositoryInterface {

    findAll(columns: Array<string>, conditions: { [key: string]: any }): Promise<any>;
    findById(id: number): Promise<any>;
    create(newRegister: { [key: string]: any } ): Promise<any>;
    delete(id: number): Promise<any>;
    update(id: number, datasModified: { [key: string]: any }): Promise<any>;
}

export default ClientRepositoryInterface;