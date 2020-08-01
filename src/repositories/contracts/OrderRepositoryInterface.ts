
interface OrderRepositoryInterface {

    create(newRegister: { [key: string]: any } ): Promise<any>;
}

export default OrderRepositoryInterface;