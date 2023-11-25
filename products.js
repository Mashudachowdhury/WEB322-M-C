const express = require('express');
const router = express.Router();
const ProductService = require('../services/ProductService');

router.get('/', (req, res) => {
  res.json(ProductService.getAllProducts());
});

router.get('/:id', (req, res) => {
  res.json(ProductService.getProductById(req.params.id));
});

router.post('/', (req, res) => {
  res.json(ProductService.createProduct(req.body));
});

router.delete('/:id', (req, res) => {
  res.json(ProductService.deleteProduct(req.params.id));
});

module.exports = router;