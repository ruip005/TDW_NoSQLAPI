const mongoose = require("mongoose");

const bidSchema = new mongoose.Schema({
  bidAmount: {
    type: Number,
    required: true,
  },
  // Outros campos específicos dos lances, se necessário
});

const licitationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  bids: [bidSchema], // Agora a licitação possui uma array de lances
  status: {
    type: String,
    enum: ["open", "closed", "canceled"],
    default: "open",
  },
});

const Licitation = mongoose.model("Licitation", licitationSchema);

module.exports = Licitation;
