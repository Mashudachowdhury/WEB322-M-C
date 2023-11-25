let products = []; // Placeholder for products data

class Product {
  static getAllProducts() {
    return products;
  }

  static getProductById(id) {
    return products.find(product => product.id === Number(id));
  }

  static createProduct(productData) {
    const newProduct = {
      id: products.length + 1,
      ...productData
    };
    products.push(newProduct);
    return newProduct;
  }

  static updateProduct(id, updatedProductData) {
    const productIndex = products.findIndex(product => product.id === Number(id));
    if (productIndex > -1) {
      products[productIndex] = {
        ...products[productIndex],
        ...updatedProductData
      };
      return products[productIndex];
    }
    return null; // Return null if the product with the given ID was not found
  }

  static deleteProduct(id) {
    const productIndex = products.findIndex(product => product.id === Number(id));
    if (productIndex > -1) {
      const deletedProduct = products.splice(productIndex, 1)[0];
      return deletedProduct;
    }
    return null; // Return null if the product with the given ID was not found
  }
}

module.exports = Product;
