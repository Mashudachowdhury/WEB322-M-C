// services/authenticationService.js
class AuthenticationService {
    login(req, res) {
      const { email, password } = req.body;
  
      // Assuming users are stored in a file named fakeUsers.json
      const users = require('../fakeUsers.json');
  
      const user = users.find(user => user.email === email && user.password === password);
  
      if (user && user.isAdmin) {
        res.json({ isAuthenticated: true });
      } else {
        res.status(401).json({ isAuthenticated: false });
      }
    }
  }
  
  module.exports = new AuthenticationService();
  