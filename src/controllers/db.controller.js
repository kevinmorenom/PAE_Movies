const MongoClient = require('mongodb').MongoClient;

require('dotenv').config();
const url = process.env.DB_HOST;

function conectMongo(collectionName) {
    return new Promise(function (resolve, reject) {
        MongoClient.connect(url, {
            useUnifiedTopology: true
        }, function (err, client) {
            if (err) {
                reject(err);

            } else {
                const db = client.db();
                const collection = db.collection(collectionName);
                resolve({
                    find: function (data, callback) {
                        collection.find(data).toArray(function (err, results) {
                            callback(results);

                        });
                    },
                    insert: function (data, callback) {
                        collection.insertOne(data, function (err, results) {
                            callback(results);

                        });
                    },
                    update: function (filter, data, callback) {
                        collection.updateOne({
                            "_id": ObjectId(filter)
                        }, {
                            $set: data
                        }, function (err, results) {
                            callback(results);

                        });
                    },
                    delete: function (data, callback) {
                        console.log("This is the data:", data)
                        collection.deleteOne(data, function (err, results) {
                            callback(results);
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
                    },
                    updateOne: (filters, document) => {


                        filters = filters || {};
                        limit = limit || 25;


                        return new Promise((resolve, reject) => {
                            collection.updateOne(filters, document, options).toArray((err, results) => {
                                console.log('googlelogin');
                                if (err) {
                                    
                                    reject(err);
                                } else {
                                    
                                    resolve(results);
                                }

                            })
                        });
                    }
                });
            }
        });
    });

}

module.exports = conectMongo;