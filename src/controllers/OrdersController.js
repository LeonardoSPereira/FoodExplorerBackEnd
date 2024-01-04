const OrdersServices = require("../services/OrdersServices");
const OrdersRepository = require("../repositories/OrdersRepository");


class OrdersController {
    
    async create(request, response) {
        const { orderItems } = request.body;
        const user_id = request.user.id;
        
        const ordersRepository = new OrdersRepository();
        const ordersServices = new OrdersServices(ordersRepository);

        await ordersServices.createProduct({ user_id, orderItems });

        return response.status(201).json({
            status: "success",
            message: "Pedido criado com sucesso"
        })

    }

    async index(request, response) {
        const user_id = request.user.id;

        const ordersRepository = new OrdersRepository();
        const ordersServices = new OrdersServices(ordersRepository);

        const orders = await ordersServices.listAllProducts({ user_id });

        return response.status(200).json({
            status: "success",
            orders
        })
        
    }

    async show(request, response) {
        const { id } = request.params;

        const ordersRepository = new OrdersRepository();
        const ordersServices = new OrdersServices(ordersRepository);

        const order = await ordersServices.listOrderById({ id });

        return response.json({
            status: "success",
            order
        })
    }

}

module.exports = OrdersController;