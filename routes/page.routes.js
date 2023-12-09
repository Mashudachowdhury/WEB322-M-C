const express = require("express");
const pageRoutes = express.Router();
const UsersService = require("../services/users.service");
const ProductsService = require("../services/products.service");
const AuthenticationService = require("../services/authentication.service");

pageRoutes.get("/", (req, res) => {
  res.render("login");
});

pageRoutes.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;
    const authentication = await AuthenticationService.authenticate(username, password);

    if (authentication.isAuthenticated) {
      res.redirect(`/users`);
    } else {
      res.redirect("/");
    }
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

pageRoutes.get("/users", async (req, res) => {
  try {
    const users = await UsersService.getAllUsers();

    const itemsToDisplay = 15;
    const page = parseInt(req.query?.page) || 1;
    const start = page == 1 ? 0 : (page - 1) * itemsToDisplay - 1;
    const end = start + itemsToDisplay;
    const filteredUsers = users.filter((user, idx) => idx > start && idx <= end);

    res.render("users", {
      title: "Users",
      users: filteredUsers,
      itemsToDisplay,
      page,
      start,
      end,
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

pageRoutes.get("/users/:id", async (req, res) => {
  try {
    const user = await UsersService.getUserByIdWithOrders(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.render("userDetail", { user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

pageRoutes.get("/products", async (req, res) => {
  try {
    const products = await ProductsService.getAllProducts();

    const itemsToDisplay = 15;
    const page = parseInt(req.query?.page) || 1;
    const start = page == 1 ? 0 : (page - 1) * itemsToDisplay - 1;
    const end = start + itemsToDisplay;
    const filteredProducts = products.filter((product, idx) => idx > start && idx <= end);

    res.render("products", {
      title: "Products",
      products: filteredProducts,
      itemsToDisplay,
      page,
      start,
      end,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

pageRoutes.get("/products/:id", async (req, res) => {
  try {
    const product = await ProductsService.getProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.render("productDetail", { product });
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = pageRoutes;