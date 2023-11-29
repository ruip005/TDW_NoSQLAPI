const express = require('express');
const { MongoClient } = require('mongodb');
const app = express()
app.use(express.json())

const url = "mongodb://localhost:27017"
const dbName = "bobac"
const collectionName = "menu_do_dia"

function dbConnection() {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url).then((client) => {
            const db = client.db(dbName);
            const collection = db.collection(collectionName);
            resolve(collection);
        }).catch((err) => {
            reject("Connection error: " + err);
        });
    });
}

require('./Controllers/prato_do_dia')(app, dbConnection)
app.listen(3000, () => console.log('Servidor à escuta na porta 3000...'));