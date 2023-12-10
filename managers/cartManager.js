const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const cartsFilePath = path.join(__dirname, "../data/carts.json");

class CartManager {
  async readData() {
    const data = await fs.readFile(cartsFilePath, "utf8");
    return JSON.parse(data);
  }

  async writeData(data) {
    await fs.writeFile(cartsFilePath, JSON.stringify(data, null, 2), "utf8");
  }

  async getCarts() {
    return this.readData();
  }

  async getCartById(id) {
    const carts = await this.readData();
    return carts.find((c) => c.id === id);
  }

  async createCart() {
    const carts = await this.readData();
    const newCart = {
      id: uuidv4(),
      products: [],
    };
    carts.push(newCart);
    await this.writeData(carts);
    return newCart;
  }

  async addProductToCart(cartId, productId, quantity) {
    const carts = await this.readData();
    const cart = carts.find((c) => c.id === cartId);
    if (!cart) {
      throw new Error("Carrito no encontrado");
    }
    const productIndex = cart.products.findIndex(
      (p) => p.productId === productId
    );
    if (productIndex !== -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }
    await this.writeData(carts);
  }

  async removeProductFromCart(cartId, productId) {
    const carts = await this.readData();
    const cart = carts.find((c) => c.id === cartId);
    if (!cart) {
      throw new Error("Carrito no encontrado");
    }
    cart.products = cart.products.filter((p) => p.productId !== productId);
    await this.writeData(carts);
  }
}

module.exports = new CartManager();
