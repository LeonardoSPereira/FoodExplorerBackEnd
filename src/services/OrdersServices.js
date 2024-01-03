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

        if(user.isAdmin == true) {
            //if the user is an admin, list all orders
            const orders = await this.ordersRepository.listAllOrders();

            return orders;
        } 

        //if the user is not an admin, list only the orders of the user
        const orders = await this.ordersRepository.listOrdersByUserId(user_id);

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

}

module.exports = OrdersServices;