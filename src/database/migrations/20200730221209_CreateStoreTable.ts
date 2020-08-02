import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    await knex.schema.createTable('stores', function (table) {
        table.increments();
        table.string('name').notNullable();
        table.integer('client_id')
            .unsigned()
            .references('id')
            .inTable('clients');

    })
}


export async function down(knex: Knex): Promise<any> {
    return await knex.schema.dropTable("stores");
}

