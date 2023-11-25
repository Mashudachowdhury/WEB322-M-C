const express = require('express');
const router = express.Router();

// Import user and product routes
const userRoutes = require('./users');
const productRoutes = require('./products');

router.use('/users', userRoutes);
router.use('/products', productRoutes);

module.exports = router;


const AuthenticationService = require('../services/AuthService');

router.post('/login', (req, res) => {
  const result = AuthenticationService.login(req.body.email, req.body.password);
  if (result.isAuthenticated) {
    res.json(result);
  } else {
    res.status(401).json(result);
  }
});