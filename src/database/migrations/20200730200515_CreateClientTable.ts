import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    await knex.schema.createTable('clients', function (table) {
        table.increments();
        table.string('name').notNullable();
    })
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable("clients");
}

