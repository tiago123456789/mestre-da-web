import * as Knex from "knex";


export async function up(knex: Knex): Promise<any> {
    await knex.schema.createTable('products', function (table) {
        table.increments();
        table.string('name').notNullable();
        table.string('description').notNullable();
        table.decimal('price', 10, 2).notNullable();
    });
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable("products");
}
