const knex = require('../database/knex');
const AppError = require("../utils/AppError");


class OrdersItemsRepository {

    async createOrderItem({ order_id, orderItems }) {
        
       try {
            //for each item in the array, insert the order_id, product_id, quantity and price_per_item into the order_items table
            orderItems.forEach(async order => {

                let parsedQuantity = order.quantity;
                let pricePerItem = order.price_per_item;

                // if the quantity or price_per_item are not numbers, parse them
                if(typeof order.quantity !== "number") {
                    parsedQuantity = parseInt(order.quantity);
                }

                if(typeof order.price_per_item !== "number") {
                    const formattedPrice = order.price_per_item.replace(",", ".");
                    const parsedPrice = parseFloat(formattedPrice);
                    pricePerItem = parsedPrice * 100;
                }

                const totalPrice = parsedQuantity * pricePerItem;

                //insert the order into the order_items table
                await knex("order_items").insert({
                    order_id,
                    product_id: order.product_id,
                    quantity: parsedQuantity,
                    price_per_item: pricePerItem,
                    total_price: totalPrice
                });

            });

            return

        } catch {
            throw new AppError("Erro ao criar pedido", 500);
        }
    }

    async listOrderItemsByOrderId(order_id) {
        try {
            //list all order items from the order
            const orderItems = await knex("order_items")
             .select([
                "products.id",
                "products.title",
                "products.price_in_cents",
                "order_items.quantity",
                "products.image",
             ])
             .where({ order_id })
             .innerJoin("products", "products.id", "order_items.product_id");

            return orderItems;  

        } catch {
            throw new AppError("Erro ao listar itens do pedido", 500);
        }
    }

}

module.exports = OrdersItemsRepository;