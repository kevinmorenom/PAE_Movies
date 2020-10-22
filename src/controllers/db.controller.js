const MongoClient = require('mongodb').MongoClient;

require('dotenv').config();
const url = process.env.DB_HOST;

function conectMongo(collectionName) {
    return new Promise(function(resolve, reject) {
        MongoClient.connect(url, {
            useUnifiedTopology: true
        }, function(err, client) {
            if (err) {
                reject(err);

            } else {
                const db = client.db();
                const collection = db.collection(collectionName);
                resolve({
                    find: function(callback) {
                        collection.find().limit(1).toArray(function(err, results) {
                            callback(results);
                            client.close();
                        });
                    }
                });
            }
        });
    });

}

module.exports = conectMongo;