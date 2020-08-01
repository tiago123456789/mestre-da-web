import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
    await knex.schema.createTable('orders', function (table) {
        table.integer('product_id')
        .unsigned()
        .references('id')
        .inTable('products')
        .notNullable();

        table.integer('store_id')
        .unsigned()
        .references('id')
        .inTable('stores')
        .notNullable();

        table.integer('quantity_selled').notNullable();
    });
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable("orders");
}


