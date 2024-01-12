const pratoModel = require('../Models/prato');

class pratinho {
    constructor(nome, preco, descricao, categoria, tipo) {
        this.nome = nome;
        this.preco = preco;
        this.descricao = descricao;
        this.categoria = categoria;
        this.tipo = tipo;
    }
}

const pratosController = {
    create: (req, res) => {
        const { nome, preco, descricao, categoria, tipo } = req.body;
        const novoPrato = pratinho(nome, preco, descricao, categoria, tipo);

        if (!nome || !preco || !descricao || !categoria || !tipo) {
            return res.status(400).json({ message: 'Preencha todos os campos!' });
        }

        pratoModel.create(novoPrato)
        .then(prato => res.status(201).json(prato))
        .catch(err => res.status(500).json({ message: err }));
    },

    all: (req, res) => {
        pratoModel.find({})
        .then(pratos => res.status(200).json(pratos))
        .catch(err => res.status(500).json({ message: err }));
    },

    edit: (req, res) => {
        const { id } = req.params;
        const { nome, preco, descricao, categoria, tipo } = req.body;

        if (!nome || !preco || !descricao || !categoria || !tipo) {
            return res.status(400).json({ message: 'Preencha todos os campos!' });
        }

        pratoModel.findByIdAndUpdate(
            id,
            {
                nome,
                preco,
                descricao,
                categoria,
                tipo
            },
            { new: true },
        )
        .then(prato => res.status(200).json({ message: 'Prato editado com sucesso!', prato }))
        .catch(err => res.status(500).json({ message: err }));
    },

    delete: (req, res) => {
        const { id } = req.params;
        pratoModel.findByIdAndDelete(id)
        .then(prato => res.status(200).json({message: 'Prato apagado com sucesso!'}))
        .catch(err => res.status(500).json({ message: err }));
    }
}

module.exports = pratosController;