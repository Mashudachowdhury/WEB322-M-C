const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/', (req, res) => {
  const products = require('../fakeProducts.json');
  res.json(products); // respond with JSON containing fake products
});

router.get('/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  const products = require('../fakeProducts.json');
  const product = products.find(product => product.id === productId);

  if (product) {
    res.json(product); // respond with JSON containing the specific product
  } else {
    res.status(404).json({ message: 'Product not found' }); // respond with a 404 status and an error message
  }
});

router.delete('/:id', (req, res) => {
  const productId = parseInt(req.params.id);
  let products = require('../fakeProducts.json');
  products = products.filter(product => product.id !== productId);

  // write updated products back to fakeProducts.json
  fs.writeFileSync('fakeProducts.json', JSON.stringify(products));

  res.json({ success: true, message: 'Product deleted successfully' }); // respond with a success message
});

router.post('/', (req, res) => {
  const newProduct = req.body;
  newProduct.id = Date.now(); // use timestamp as a temporary ID
  let products = require('../fakeProducts.json');
  products.push(newProduct);

  // write updated products back to fakeProducts.json
  fs.writeFileSync('fakeProducts.json', JSON.stringify(products));

  res.json(newProduct); // respond with JSON containing the newly added product
});

module.exports = router;