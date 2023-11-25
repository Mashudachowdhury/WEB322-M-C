let users = require('../fakeUsers.json'); // This should be replaced with actual database logic

class User {
  static getAllUsers() {
    return users;
  }

  static getUserById(id) {
    return users.find(user => user.id === Number(id));
  }

  static createUser(userData) {
    const newUser = {
      id: users.length + 1,
      ...userData
    };
    users.push(newUser);
    return newUser;
  }

  static deleteUser(id) {
    const userIndex = users.findIndex(user => user.id === Number(id));
    if (userIndex > -1) {
      users = users.filter(user => user.id !== Number(id));
      return { success: true };
    } else {
      return { success: false };
    }
  }
}

module.exports = User;