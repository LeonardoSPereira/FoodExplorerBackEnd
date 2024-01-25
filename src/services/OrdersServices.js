const AppError = require("../utils/AppError");
const UserRepository = require("../repositories/UserRepository");


class OrdersServices {
    constructor(ordersRepository) {
        this.ordersRepository = ordersRepository;
    }

    async createProduct({ user_id, orderItems }) {

        //check if the user_id is present
        if(!user_id) {
            throw new AppError("Usuário não informado");
        }
        
        //for each order in the array, check if the product_id, quantity and price_per_item are present
        orderItems.forEach(order => {

            if(!order.product_id || !order.quantity || !order.price_per_item) {
                throw new AppError("Dados incompletos");
            }  
            
        });

        //create the order in the orders table
        await this.ordersRepository.createProduct({ user_id, orderItems });

        return
    }

    async listAllProducts({ user_id }) {

        const userRepository = new UserRepository();

        if(!user_id) {
            throw new AppError("Usuário não informado");
        }

        //check if the user exists and whether the user is an admin
        const user = await userRepository.findUserById(user_id);
        
        if(!user) {
            throw new AppError("Usuário não encontrado");
        }

        let orders;

        if(user.isAdmin) {
            //if the user is an admin, list all orders
            orders = await this.ordersRepository.listAllOrders();

            return orders;
        } else {
            //if the user is not an admin, list only the orders of the user
            orders = await this.ordersRepository.listOrdersByUserId(user_id);
        }


        return orders;


    }

    async listOrderById({ id }) {

        //check if the id is present
        if(!id) {
            throw new AppError("Pedido não informado");
        }

        //list the order by id
        const order = await this.ordersRepository.listOrderById(id);

        return order;

    }

    async updateOrder({ id, status }) {

        //check if the id is present
        if(!id) {
            throw new AppError("Pedido não informado");
        }

        // check if there is an order with the given id
        const order = await this.ordersRepository.listOrderById(id);

        if(!order) {
            throw new AppError("Pedido não encontrado");
        }

        //check if the status is present
        if(!status) {
            throw new AppError("Status não informado");
        }

        //check if the status is valid
        if(status !== "pending" && status !== "preparing" && status !== "delivered") {
            throw new AppError("Status inválido");
        }

        //update the order
        const updated = await this.ordersRepository.updateOrder({ id, status })

        return updated;
    }

}

module.exports = OrdersServices;