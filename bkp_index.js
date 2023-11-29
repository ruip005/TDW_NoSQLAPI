const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Conectando ao MongoDB
mongoose.connect('mongodb://localhost:27017/bobac', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    require("./Controllers/prato_do_dia")(app)
  })
  .catch(err => {
    console.error('Could not connect to MongoDB', err);
  });


// Iniciando o servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});