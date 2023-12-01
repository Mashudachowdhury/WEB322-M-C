const { Order, User, Product } = require('../models');

// a handy class for user-related operations
class UsersService {

  // get all users in the system
  static async getAllUsers() {
    try {
      const users = await User.findAll();
      return users;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Server encountered an issue");
    }
  }

  // get a user by ID with their associated orders
  static async getUserByIdWithOrders(id) {
    try {
      const user = await User.findByPk(id, {
        include: [{ model: Order }],
      });
      return user;
    } catch (error) {
      console.error("Error fetching user with orders:", error);
      throw new Error("Server encountered an issue");
    }
  }

  // create a new user
  static async createUser(userData) {
    try {
      const newUser = await User.create(userData);
      return newUser;
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Server encountered an issue");
    }
  }

  // update user details by ID
  static async updateUser(id, userData) {
    try {
      const [rowsUpdated, [updatedUser]] = await User.update(userData, {
        where: { id },
        returning: true,
      });

      if (rowsUpdated === 0) {
        throw new Error("User not found");
      }

      return updatedUser;
    } catch (error) {
      console.error("Error updating user:", error);
      throw new Error("Server encountered an issue");
    }
  }

  // delete a user by ID
  static async deleteUserById(id) {
    try {
      const deletedUser = await User.destroy({
        where: { id },
      });

      if (!deletedUser) {
        throw new Error("User not found");
      }

      return { success: true };
    } catch (error) {
      console.error("Error deleting user:", error);
      throw new Error("Server encountered an issue");
    }
  }
}

module.exports = UsersService;