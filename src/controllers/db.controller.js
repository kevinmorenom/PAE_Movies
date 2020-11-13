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
                    find: function(data, callback) {
                        collection.find(data).toArray(function(err, results) {
                            callback(results);
                            client.close();
                        });
                    },
                    insert: function(data, callback) {
                        collection.insertOne(data, function(err, results) {
                            callback(results);
                            client.close();
                        });
                    },
                    update: function(filter, data, callback) {
                        collection.updateOne({ "_id": ObjectId(filter) }, { $set: data }, function(err, results) {
                            callback(results);
                            client.close();
                        });
                    },
                    delete: function(data, callback) {
                        collection.deleteOne(data, function(err, results) {
                            callback(results);
                            client.close();
                        });
                    },
                    findOne: (filters) => {
                        filters = filters || {};
                        return new Promise((resolve, reject) => {
                            collection.findOne(filters).then((results) => {
                                resolve(results);
                                client.close();
                            }).catch(err => {
                                reject(err);
                            })
                        });
                    },
                    insertOne: (filters) => {
                        filters = filters || {};
                        return new Promise((resolve, reject) => {
                            collection.insertOne(filters).then((result) => {
                                resolve(result);
                                client.close();
                            }).catch(err => {
                                reject(err);
                            })
                        });
                    }
                });
            }
        });
    });

}

module.exports = conectMongo;