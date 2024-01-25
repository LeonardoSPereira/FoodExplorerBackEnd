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

    async listAllOrders() {

        const ordersItemsRepository = new OrdersItemsRepository();
        
        try {
            //list all orders
            const orders = await knex("orders").select("*").orderBy("created_at", "desc");

            let ordersWithItems = [];
            
            //for each order, get the order items and add them to the order object
            for(let i = 0; i < orders.length; i++) {
                const orderItems = await ordersItemsRepository.listOrderItemsByOrderId(orders[i].id);
                ordersWithItems = [...ordersWithItems, { ...orders[i], orderItems }];
            }
            

            return ordersWithItems;

        } catch {
            throw new AppError("Erro ao listar pedidos", 500);
        }
    }

    async listOrdersByUserId(user_id) {
        const ordersItemsRepository = new OrdersItemsRepository();

        try {
            //list all orders from the user
            const orders = await knex("orders").where({ user_id }).select("*").orderBy("created_at", "desc");
            let ordersWithItems = [];

            //for each order, get the order items and add them to the order object
            for(let i = 0; i < orders.length; i++) {
                const orderItems = await ordersItemsRepository.listOrderItemsByOrderId(orders[i].id);
                ordersWithItems = [...ordersWithItems, {...orders[i], orderItems}];
            }

            return ordersWithItems;

        } catch {
            throw new AppError("Erro ao listar pedidos", 500);
        }
    }

    async listOrderById(id) {
        const ordersItemsRepository = new OrdersItemsRepository();

        try {
            //list the order by id
            const order = await knex("orders").where({ id }).first();

            //list the order items by order id
            const orderItems = await ordersItemsRepository.listOrderItemsByOrderId(id);

            //add the order items to the order object
            const orderWithItems = {...order, orderItems};

            return orderWithItems;

        } catch {
            throw new AppError("Erro ao listar pedido", 500);
        }
    }

    async updateOrder({ id, status }) {
        try {
            //update the order status
            await knex("orders").where({ id }).update({ status });

            return
        } catch {
            throw new AppError("Erro ao atualizar pedido", 500);
        }
    }

}

module.exports = OrdersRepository;