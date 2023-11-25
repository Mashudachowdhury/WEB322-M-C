class UserService {
    constructor(users) {
      this.users = users; 
    }
  
    getAllUsers() {
      return this.users.getAllUsers(); 
    }
  
    getUserById(userId) {
      return this.users.getUserById(userId); 
    }
  
    createUser(newUser) {
      return this.users.createUser(newUser); 
    }
  
    deleteUser(userId) {
      return this.users.deleteUser(userId); 
    }
  }
  
  module.exports = UserService;
  