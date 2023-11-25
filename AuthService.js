class AuthService {
    constructor(users) {
      this.users = users; // Users model or service functions
    }
  
    authenticateUser(email, password) {
      const user = this.users.getUserByEmail(email); 
      if (user && user.password === password && user.isAdmin) {
        return { isAuthenticated: true };
      }
      return { isAuthenticated: false };
    }
  }
  
  module.exports = AuthService;
  