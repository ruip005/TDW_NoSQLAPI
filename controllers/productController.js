const productSchema = require("../models/productModel");

class produto {
  constructor(nome, preco, descricao) {
    this.nome = nome;
    this.preco = preco;
    this.descricao = descricao;
  }
}

const productController = {
  getAllProducts: async (req, res) => {
    try {
      const products = await productSchema.find();
      res.json(products);
    } catch (error) {
      console.log("Erro ao obter produtos:", error);
      res.status(500).json({ message: "Erro ao obter produtos" });
    }
  },

  getProductById: async (req, res) => {
    try {
      const product = await productSchema.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }
      res.json(product);
    } catch (error) {
      console.log("Erro ao obter produto:", error);
      res.status(500).json({ message: "Erro ao obter produto" });
    }
  },

  createProduct: async (req, res) => {
    try {
      const product = new productSchema(req.body);
      if (!product.nome || !product.preco || !product.descricao) {
        return res.status(400).json({
          message: "O nome, o preço e a descrição são obrigatórios",
        });
      }
      const newProduct = new produto(
        product.nome,
        product.preco,
        product.descricao
      );
      await newProduct.save();
      res.json(product);
    } catch (error) {
      console.log("Erro ao criar produto:", error);
      res.status(500).json({ message: "Erro ao criar produto" });
    }
  },

  updateProduct: async (req, res) => {
    try {
      const product = await productSchema.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }

      const newData = productSchema(req.body);
      if (!newData.nome || !newData.preco || !newData.descricao) {
        return res.status(400).json({
          message: "O nome, o preço e a descrição são obrigatórios",
        });
      }
      const updatedProduct = await productSchema.findByIdAndUpdate(
        req.params.id,
        newData,
        { new: true }
      );
      res.json(updatedProduct);
    } catch (error) {
      console.log("Erro ao atualizar produto:", error);
      res.status(500).json({ message: "Erro ao atualizar produto" });
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const product = await productSchema.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Produto não encontrado" });
      }
      await productSchema.findByIdAndDelete(req.params.id);
      res.json({ message: "Produto eliminado com sucesso" });
    } catch (error) {
      console.log("Erro ao eliminar produto:", error);
      res.status(500).json({ message: "Erro ao eliminar produto" });
    }
  },
};

module.exports = productController;
