import * as Knex from "knex";

export async function up(knex: Knex): Promise<any> {
    await knex.schema.createTable('stores_products', function (table) {
        table.integer('product_id')
        .unsigned()
        .references('id')
        .inTable('products')
        .notNullable().onDelete("CASCADE");

        table.integer('store_id')
        .unsigned()
        .references('id')
        .inTable('stores')
        .notNullable();

        table.integer('quantity').notNullable();
    });
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable("stores_products");
}

