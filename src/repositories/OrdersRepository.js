const OrdersItemsRepository = require('./OrdersItemsRepository');
const knex = require('../database/knex');

class OrdersRepository {

    async createProduct({ user_id, orderItems }) {
        const ordersItemsRepository = new OrdersItemsRepository();

        try {
            //create a new order for the user and return the id
            const [order] = await knex("orders").insert({
                user_id
            }).returning('id');

            // create the order items in the order_items table
            await ordersItemsRepository.createOrderItem({ order_id: order.id, orderItems });

            return

        } catch {
            throw new AppError("Erro ao criar pedido", 500);
        }
    }

}

module.exports = OrdersRepository;