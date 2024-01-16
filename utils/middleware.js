const apiKeyModel = require("../models/apiKey");

const authenticate = async (req, res, next) => {
  // Usar futuramente em terceiros
  const apiKey = req.header("x-api-key");

  if (!apiKey) {
    return res
      .status(401)
      .json({ success: false, message: "Chave de API não fornecida" });
  }

  try {
    const apiKeyRecord = await apiKeyModel.findOne({ key: apiKey });

    if (!apiKeyRecord) {
      return res
        .status(401)
        .json({ success: false, message: "Chave de API inválida" });
    }

    next();
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Erro ao autenticar a chave de API" });
  }
};

module.exports = authenticate;
