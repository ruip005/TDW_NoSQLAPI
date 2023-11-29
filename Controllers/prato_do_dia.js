module.exports = function (app, db) {
    app.get("/", (req, res) => {
        db().then((collection) => {
            collection.find({}).toArray().then((result) => {
                res.status(200).json({success: true, message: result});
            }
            ).catch((err) => {
                res.status(500).json({success: false, message: err});
            });
        }
        )
    });

    app.post("/", (req, res) => {
        const {nome_prato, categoria, tipo} = req.body;
        if (!nome_prato || !categoria || !tipo) {
            return res.status(406).json({success: false, message: "Dados incompletos!"});
        }
        db().then((collection) => {
            collection.insertOne(req.body).then((result) => {
                res.status(200).json({success: true, message: result});
            }
            ).catch((err) => {
                res.status(500).json({success: false, message: err});
            });
        }
        )
    });

    app.patch("/update", (req, res) => {
        const {nome_prato, categoria, tipo} = req.body;
        if (!nome_prato || !categoria || !tipo) {
            return res.status(406).json({success: false, message: "Dados incompletos!"});
        }
        db().then((collection) => {
            collection.updateOne({nome_prato: nome_prato}, {$set: req.body}).then((result) => {
                res.status(200).json({success: true, message: result});
            }
            ).catch((err) => {
                res.status(500).json({success: false, message: err});
            });
        }
        )
    });

    app.delete("/delete", (req, res) => {
        const {nome_prato} = req.body;
        if (!nome_prato) {
            return res.status(406).json({success: false, message: "Dados incompletos!"});
        }
        db().then((collection) => {
            collection.deleteOne({nome_prato: nome_prato}).then((result) => {
                res.status(200).json({success: true, message: result});
            }
            ).catch((err) => {
                res.status(500).json({success: false, message: err});
            });
        }
        )
    });

}