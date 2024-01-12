const express = require('express');
const app = express();
const port = 3000;
const url = 'mongodb://localhost:27017/pratos'; // Database URL
const db = require('mongoose');

const connect = () => {
    db.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conexão estabelecida com a base de dados do Antony!'))
    .catch(err => console.log('[DB Antony]',err));
}

connect();

app.use(express.json());

require('./Utils/Middlewares')

app.use('/pratos', require('./Routes/index'))

app.listen(port, () => console.log(`Servidor arrancado na porta ${port}`));