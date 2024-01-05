const OrderItemsRepositoryInMemory = require("./OrderItemsRepositoryInMemory");

class OrdersRepositoryInMemory {
    constructor() {
        this.orders = [];
        this.orderItemsRepositoryInMemory = new OrderItemsRepositoryInMemory();

    }

    async createProduct({ user_id, orderItems }) {
        
        const createOrderItems = await this.orderItemsRepositoryInMemory.createOrderItem({ orderItems });
        
        
        const order = {
            user_id,
            createOrderItems
        }

        this.orders.push(order);

    }


}

module.exports = OrdersRepositoryInMemory;