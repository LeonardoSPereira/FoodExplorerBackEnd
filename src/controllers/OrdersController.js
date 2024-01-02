const OrdersServices = require("../services/OrdersServices");
const OrdersRepository = require("../repositories/OrdersRepository");


class OrdersController {
    
    async create(request, response) {
        const { user_id } = request.params;
        const { orderItems } = request.body;
        
        const ordersRepository = new OrdersRepository();
        const ordersServices = new OrdersServices(ordersRepository);

        await ordersServices.createProduct({ user_id, orderItems });

        return response.status(201).json({
            status: "success",
            message: "Produto criado com sucesso"
        })

    }

    async index(request, response) {
        response.send("Orders index");
    }

    async show(request, response) {
        response.send("Orders show");
    }


}

module.exports = OrdersController;