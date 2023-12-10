const cartManager = require("../managers/CartManager");

const cartController = {
  async getCarts(req, res) {
    try {
      const carts = await cartManager.getCarts();
      res.json(carts);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getCartById(req, res) {
    try {
      const cart = await cartManager.getCartById(req.params.id);
      if (cart) {
        res.json(cart);
      } else {
        res.status(404).json({ message: "Carrito no encontrado" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async createCart(req, res) {
    try {
      const newCart = await cartManager.createCart();
      res.status(201).json(newCart);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async addProductToCart(req, res) {
    try {
      const { productId, quantity } = req.body;
      if (!productId || !quantity) {
        return res.status(400).json({ message: "Datos incompletos" });
      }
      await cartManager.addProductToCart(req.params.id, productId, quantity);
      res
        .status(200)
        .json({ message: "Producto añadido o actualizado en el carrito" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async removeProductFromCart(req, res) {
    try {
      const { productId } = req.body;
      if (!productId) {
        return res.status(400).json({ message: "Datos incompletos" });
      }
      await cartManager.removeProductFromCart(req.params.id, productId);
      res.status(200).json({ message: "Producto eliminado del carrito" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = cartController;
