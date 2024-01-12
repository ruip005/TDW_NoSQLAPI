const mongoose = require('mongoose');

const pratoSchema = new mongoose.Schema({
    nome: { 
        type: String, 
        required: [true, 'Nome do prato é obrigatório!']
    },
    preco: { 
        type: Number, 
        required: [true, 'Preço do prato é obrigatório!']
    },
    descricao: { 
        type: String, 
        required: [true, 'Descrição do prato é obrigatório!']
    },
    categoria: { 
        type: String, 
        required: [true, 'Categoria do prato é obrigatório!']
    },
    tipo: { 
        type: String, 
        required: [true, 'Tipo do prato é obrigatório!']
    }
}, { timestamps: true });

const pratoModel = mongoose.model('prato', pratoSchema);

module.exports = pratoModel;