const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const productsFilePath = path.join(__dirname, "../data/products.json");

class ProductManager {
  async readData() {
    const data = await fs.readFile(productsFilePath, "utf8");
    return JSON.parse(data);
  }

  async writeData(data) {
    await fs.writeFile(productsFilePath, JSON.stringify(data, null, 2), "utf8");
  }

  async getProducts() {
    return this.readData();
  }

  async getProductByCode(code) {
    const products = await this.readData();
    return products.find((p) => p.code === code);
  }

  async addProduct(productData) {
    const products = await this.readData();
    const newProduct = {
      id: uuidv4(),
      ...productData,
      status: productData.status ?? true,
    };
    products.push(newProduct);
    await this.writeData(products);
    return newProduct;
  }

  async updateProduct(id, updatedData) {
    const products = await this.readData();
    const index = products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new Error("Producto no encontrado");
    }
    products[index] = { ...products[index], ...updatedData };
    await this.writeData(products);
  }

  async deleteProduct(id) {
    const products = await this.readData();
    const filteredProducts = products.filter((p) => p.id !== id);
    await this.writeData(filteredProducts);
  }
}

module.exports = new ProductManager();
