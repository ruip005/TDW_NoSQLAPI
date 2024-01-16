const mongoose = require("mongoose");

const apikeySchema = new mongoose.Schema({
  key: {
    type: String,
    required: true,
  },
});

const apikeyModel = mongoose.model("apikey", apikeySchema);

module.exports = apikeyModel;
