const productManager = require("../managers/ProductManager");

const productController = {
  async getProducts(req, res) {
    try {
      const products = await productManager.getProducts();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async getProductById(req, res) {
    try {
      const product = await productManager.getProductById(req.params.id);
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ message: "Producto no encontrado" });
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async addProduct(req, res) {
    try {
      const { title, price, code } = req.body;
      if (!title || !price || !code) {
        return res.status(400).json({ message: "Datos incompletos" });
      }
      const existingProduct = await productManager.getProductByCode(code);
      if (existingProduct) {
        return res
          .status(400)
          .json({ message: "El código del producto ya existe" });
      }
      const newProduct = await productManager.addProduct(req.body);
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async updateProduct(req, res) {
    try {
      await productManager.updateProduct(req.params.id, req.body);
      res.status(200).json({ message: "Producto actualizado" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  async deleteProduct(req, res) {
    try {
      await productManager.deleteProduct(req.params.id);
      res.status(200).json({ message: "Producto eliminado" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = productController;
