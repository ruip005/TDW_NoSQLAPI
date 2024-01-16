const bidsSchema = require("../models/bidsModel");

class Licitation {
  constructor(
    title,
    description,
    startDate,
    endDate,
    productId,
    status = "open"
  ) {
    this.title = title;
    this.description = description;
    this.startDate = startDate;
    this.endDate = endDate;
    this.productId = productId;
    this.bids = [];
    this.status = status;
  }
}

class Bid {
  constructor(bidAmount) {
    this.bidAmount = bidAmount;
  }
}

const bidsController = {
  createBid: async (req, res) => {
    try {
      const bid = new bidsSchema(req.body);
      if (!bid.bidAmount) {
        return res.status(400).json({
          message: "O valor do lance é obrigatório",
        });
      }
      if (bid.productId) {
        const existingProduct = await productSchema.findById(bid.productId);
        if (!existingProduct) {
          return res.status(404).json({ message: "Produto não encontrado" });
        }
      }
      const newBid = new Bid(bid.bidAmount);
      await newBid.save();
      res.json(bid);
    } catch (error) {
      console.log("Erro ao criar lance:", error);
      res.status(500).json({ message: "Erro ao criar lance" });
    }
  },

  getAllBids: async (req, res) => {
    try {
      const bids = await bidsSchema.find();
      res.json(bids);
    } catch (error) {
      console.log("Erro ao obter lances:", error);
      res.status(500).json({ message: "Erro ao obter lances" });
    }
  },

  getBidById: async (req, res) => {
    try {
      const bid = await bidsSchema.findById(req.params.id);
      if (!bid) {
        return res.status(404).json({ message: "Lance não encontrado" });
      }
      res.json(bid);
    } catch (error) {
      console.log("Erro ao obter lance:", error);
      res.status(500).json({ message: "Erro ao obter lance" });
    }
  },

  updateBid: async (req, res) => {
    try {
      const bid = await bidsSchema.findById(req.params.id);
      if (!bid) {
        return res.status(404).json({ message: "Lance não encontrado" });
      }
      const newBid = new Bid(bid.bidAmount);
      await newBid.save();
      res.json(bid);
    } catch (error) {
      console.log("Erro ao atualizar lance:", error);
      res.status(500).json({ message: "Erro ao atualizar lance" });
    }
  },

  deleteBid: async (req, res) => {
    try {
      const bid = await bidsSchema.findById(req.params.id);
      if (!bid) {
        return res.status(404).json({ message: "Lance não encontrado" });
      }
      await bid.remove();
      res.json({ message: "Lance removido com sucesso" });
    } catch (error) {
      console.log("Erro ao remover lance:", error);
      res.status(500).json({ message: "Erro ao remover lance" });
    }
  },
};

module.exports = bidsController;
