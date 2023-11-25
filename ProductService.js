const Product = require('../models/Products'); // Import the Product model

class ProductService {
  // Get all products
  getAllProducts() {
    return Product.find();
  }

  // Get product by ID
  getProductById(productId) {
    return Product.findById(productId);
  }

  // Create a new product
  createProduct(productData) {
    const newProduct = new Product(productData);
    return newProduct.save();
  }

  // Update product by ID
  updateProduct(productId, updatedProductData) {
    return Product.findByIdAndUpdate(productId, updatedProductData, { new: true });
  }

  // Delete product by ID
  deleteProduct(productId) {
    return Product.findByIdAndDelete(productId);
  }
}

module.exports = ProductService;
