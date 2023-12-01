const { Order, User, Product } = require('../models');

// a service class for handling order-related operations
class OrdersService {

  // retrieve all orders
  static async getAllOrders() {
    try {
      const orders = await Order.findAll();
      return orders;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw new Error("Internal Server Error");
    }
  }

  // retrieve an order by its ID with associated user and product details
  static async getOrderByIdWithDetails(id) {
    try {
      const order = await Order.findByPk(id, { 
        include: [
          { model: User },
          { model: Product }
        ]
      });
      return order;
    } catch (error) {
      console.error("Error fetching order with details:", error);
      throw new Error("Internal Server Error");
    }
  }

  // create a new order
  static async createOrder(orderData) {
    try {
      const newOrder = await Order.create(orderData);
      return newOrder;
    } catch (error) {
      console.error("Error creating order:", error);
      throw new Error("Internal Server Error");
    }
  }

  // update order details by its ID
  static async updateOrder(id, orderData) {
    try {
      const [rowsUpdated, [updatedOrder]] = await Order.update(orderData, {
        where: { id },
        returning: true,
      });

      if (rowsUpdated === 0) {
        throw new Error("Order not found");
      }

      return updatedOrder;
    } catch (error) {
      console.error("Error updating order:", error);
      throw new Error("Internal Server Error");
    }
  }

  // delete an order by its ID
  static async deleteOrderById(id) {
    try {
      const deletedOrder = await Order.destroy({
        where: { id },
      });

      if (!deletedOrder) {
        throw new Error("Order not found");
      }

      return { success: true };
    } catch (error) {
      console.error("Error deleting order:", error);
      throw new Error("Internal Server Error");
    }
  }
}

module.exports = OrdersService;