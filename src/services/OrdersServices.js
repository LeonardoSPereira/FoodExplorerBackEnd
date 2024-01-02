const AppError = require("../utils/AppError");

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

}

module.exports = OrdersServices;