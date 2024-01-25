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
            status: "Success",
            message: "Pedido criado com sucesso"
        })

    }

    async index(request, response) {
        const user_id = request.user.id;

        const ordersRepository = new OrdersRepository();
        const ordersServices = new OrdersServices(ordersRepository);

        const orders = await ordersServices.listAllProducts({ user_id });

        return response.status(200).json({
            status: "Success",
            orders
        })
        
    }

    async show(request, response) {
        const { id } = request.params;

        const ordersRepository = new OrdersRepository();
        const ordersServices = new OrdersServices(ordersRepository);

        const order = await ordersServices.listOrderById({ id });

        return response.json({
            status: "Success",
            order
        })
    }

    async update(request, response) {
        const { id } = request.params;
        const { status } = request.body;

        const ordersRepository = new OrdersRepository();
        const ordersServices = new OrdersServices(ordersRepository);

        await ordersServices.updateOrder({ id, status });

        return response.status(200).json({
            status: "Success",
            message: "Pedido atualizado com sucesso"
        })
    }

}

module.exports = OrdersController;