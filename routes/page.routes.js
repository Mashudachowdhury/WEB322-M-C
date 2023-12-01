const express = require("express");
const pageRoutes = express.Router();
const UsersService = require("../services/users.service");
const AuthenticationService = require("../services/authentication.service");

// render the login page
pageRoutes.get("/", (req, res) => {
  res.render("login");
});

// handle login form submission
pageRoutes.post("/", async (req, res) => {
  try {
    const authentication = await AuthenticationService.authenticate(null, null);
    if (authentication.isAuthenticated) res.redirect(`/list`);
    else res.redirect("/");
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// render the list page with paginated user data
pageRoutes.get("/list", async (req, res) => {
  try {
    const users = await UsersService.getAllUsers();

    const itemsToDisplay = 15;
    const page = parseInt(req.query?.page) || 1;
    const start = page == 1 ? 0 : (page - 1) * itemsToDisplay - 1;
    const end = start + itemsToDisplay;
    const filteredUsers = users.filter((user, idx) => idx > start && idx <= end);

    res.render("list", {
      title: "list",
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

// render the detail page for a specific user
pageRoutes.get("/detail/:id", async (req, res) => {
  try {
    const user = await UsersService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.render("detail", { user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = pageRoutes;