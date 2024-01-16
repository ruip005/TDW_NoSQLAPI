const express = require("express");
const app = express();
const db = require("mongoose");
const port = 3000;
require("dotenv").config();

app.use(express.json());

connectDB = async () => {
  // Função para ligar à base de dados
  try {
    await db.connect(process.env.MONGOURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Ligação MongoDB estabelecida.");
    console.log("Database atual:", db.connection.db.databaseName);
  } catch (error) {
    console.error("Ligação MongoDB não estabelecida:", error);
    process.exit(1);
  }
};

// Iniciar a ligação à base de dados
connectDB();

// Carregar auth
process.env.USEAUTH ? app.use(require("./utils/middleware")) : null;

// Roteadores
app.use(process.env.SINGLEROUTE, require("./routes/api"));

app.listen(port, function () {
  console.log(`Servidor arrancado na porta ${port}!`);
});
