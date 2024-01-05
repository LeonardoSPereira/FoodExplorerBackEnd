class OrderItemsRepositoryInMemory {
  constructor() {
    this.orderItems = [];
    this.order_id = Math.floor(Math.random() * 1000) + 1

  }

  async createOrderItem({ orderItems }) {

    const items = await Promise.all(orderItems.map(async order => {
      const orderItem = {
        order_id: this.order_id,
        product_id: order.product_id,
        quantity: order.quantity,
        price_per_item: order.price_per_item,
        total_price: order.quantity * order.price_per_item
      };

      return orderItem;
      
    }));

    this.orderItems.push(items);
    
    return items;

    }


}

module.exports = OrderItemsRepositoryInMemory;