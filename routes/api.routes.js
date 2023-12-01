const express = require("express");
const apiRoutes = express.Router();
const UsersService = require("../services/users.service");
const ProductsService = require("../services/products.service");
const OrdersService = require("../services/orders.service");

module.exports = () => {
  
  // CRUD operations for orders
  apiRoutes.get("/orders", async (req, res) => {
    try {
      const orders = await OrdersService.getAllOrders();
      res.json(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  apiRoutes.get("/orders/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const order = await OrdersService.getOrderByIdWithDetails(id);
      if (!order) {
        return res.status(404).json({ error: "Order not found" });
      }
      res.json(order);
    } catch (error) {
      console.error("Error fetching order:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  apiRoutes.post("/orders", async (req, res) => {
    const newOrderData = req.body;
    try {
      const newOrder = await OrdersService.createOrder(newOrderData);
      res.json(newOrder);
    } catch (error) {
      console.error("Error adding order:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  apiRoutes.put("/orders/:id", async (req, res) => {
    const id = req.params.id;
    const orderData = req.body;
    try {
      const updatedOrder = await OrdersService.updateOrder(id, orderData);
      res.json(updatedOrder);
    } catch (error) {
      console.error("Error updating order:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  apiRoutes.delete("/orders/:id", async (req, res) => {
    const id = req.params.id;
    try {
      await OrdersService.deleteOrderById(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting order:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // CRUD operations for users
  apiRoutes.get("/users", async (req, res) => {
    try {
      const users = await UsersService.getAllUsers();
      res.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  apiRoutes.get("/users/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const user = await UsersService.getUserByIdWithOrders(id);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  apiRoutes.delete("/users/:id", async (req, res) => {
    const id = req.params.id;
    try {
      await UsersService.deleteUserById(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  apiRoutes.post("/users", async (req, res) => {
    const newUserData = req.body;
    try {
      const newUser = await UsersService.createUser(newUserData);
      res.json(newUser);
    } catch (error) {
      console.error("Error adding user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  apiRoutes.put("/users/:id", async (req, res) => {
    const id = req.params.id;
    const userData = req.body;
    try {
      const updatedUser = await UsersService.updateUser(id, userData);
      res.json(updatedUser);
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  // CRUD operations for products
  apiRoutes.get("/products", async (req, res) => {
    try {
      const products = await ProductsService.getAllProducts();
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  apiRoutes.get("/products/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const product = await ProductsService.getProductById(id);
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
      res.json(product);
    } catch (error) {
      console.error("Error fetching product:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  apiRoutes.delete("/products/:id", async (req, res) => {
    const id = req.params.id;
    try {
      await ProductsService.deleteProductById(id);
      res.json({ success: true });
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  apiRoutes.post("/products", async (req, res) => {
    const newProductData = req.body;
    try {
      const newProduct = await ProductsService.createProduct(newProductData);
      res.json(newProduct);
    } catch (error) {
      console.error("Error adding product:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  apiRoutes.put("/products/:id", async (req, res) => {
    const id = req.params.id;
    const productData = req.body;
    try {
      const updatedProduct = await ProductsService.updateProduct(id, productData);
      res.json(updatedProduct);
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  return apiRoutes;
};