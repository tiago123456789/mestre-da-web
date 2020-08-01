import Repository from "./Repository";
import ProductRepositoryInterface from "./contracts/ProductRepositoryInterface";
import Knex from "knex";

class ProductRepository extends Repository implements ProductRepositoryInterface {

    readonly TABLE_STORES_PRODUTCS = "stores_products"

    constructor() {
        super("products");
    }

    async decrementQuantityByProductIdAndStoreId(
        productId: number, storeId: number, quantity: number
    ): Promise<any> {

        const register = await this.getConnection()(this.TABLE_STORES_PRODUTCS)
            .where({ product_id: productId, store_id: storeId });
        const quantityDecremented = register[0].quantity - quantity;
        return this.getConnection()(this.TABLE_STORES_PRODUTCS)
            .update({ quantity: quantityDecremented })
            .where({ product_id: productId, store_id: storeId });
    }

    async getQuantityByProductIdAndStoreId(productId: number, storeId: number): Promise<any> {
        const quantity = await this.getConnection()(this.TABLE_STORES_PRODUTCS)
            .where({ product_id: productId, store_id: storeId })
            .select("quantity");
        return quantity[0]["quantity"] || null;
    }

    findAllByStoreId(storeId: any): Promise<any> {
        return this.getConnection()(this.getTable())
            .innerJoin(this.TABLE_STORES_PRODUTCS, function () {
                this.on(`stores_products.product_id`, '=', "products.id");
            })
            .where("stores_products.store_id", storeId);
    }

    findAll(columns: Array<string> = ["*"], conditions: { [key: string]: any } = {}): Promise<any> {
        return this.getConnection()
            .select("*")
            .from(`${this.getTable()} as p`)
            .join(this.TABLE_STORES_PRODUTCS, "p.id", `${this.TABLE_STORES_PRODUTCS}.product_id`)
    }

    updateProductAndStoreProduct(id: any, storeId: any, datasModified: { [key: string]: any }) {
        return this.getConnection()
            .transaction((trx) => {
                const { name, description, price } = datasModified;
                return trx(this.getTable())
                    .update({ name, description, price }).where({
                        id: id
                    })
                    .then(() => {
                        const { quantity } = datasModified;
                        return trx(this.TABLE_STORES_PRODUTCS)
                            .update({ quantity }).where({
                                product_id: id,
                                store_id: storeId
                            });
                    })
                    .then(() => trx.commit())
                    .catch((error) => {
                        trx.rollback();
                    });
            })
    }

    async findByName(name: string) {
        const item = await this.getConnection()(this.getTable())
            .where("name", "like", `%${name}%`);
        return item[0] || null;
    }

    create(newRegister: { [key: string]: any }): Promise<any> {
        return this.getConnection()
            .transaction(async (trx) => {
                const { name, description, price } = newRegister;
                const productWithName = await this.findByName(
                    name);

                if (productWithName) {
                    return trx(this.TABLE_STORES_PRODUTCS)
                        .insert({
                            store_id: newRegister.store_id,
                            product_id: productWithName.id,
                            quantity: newRegister.quantity
                        })
                        .then(() => trx.commit())
                        .catch((error) => {
                            trx.rollback();
                        });
                }

                return trx(this.getTable())
                    .insert({ name, description, price })
                    .then(function (response) {
                        const productId = response[0];
                        return {
                            product_id: productId,
                            store_id: newRegister.store_id,
                            quantity: newRegister.quantity
                        }
                    })
                    .then(storeProduct => trx(this.TABLE_STORES_PRODUTCS).insert(storeProduct))
                    .then(() => trx.commit())
                    .catch((error) => {
                        trx.rollback()
                    });
            })
    }

};

export default ProductRepository;