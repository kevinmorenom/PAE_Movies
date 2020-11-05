const express = require('express');
const axios = require('axios');
const MongoConnect = require('./db.controller');
require('dotenv').config();

const apiUrl = process.env.API_URL;
const apiKey = process.env.API_KEY;

class toWatch {
    getOneToWatch(req, res) {
        MongoConnect('ToWatch')
            .then(
                function(collection) {
                    collection.find(req.body, function(results) {
                        res.render('index', {
                            body: JSON.stringify(results[0])

                        });
                    });
                }
            )
            .catch(function() {
                res.send("ERROR");
            });
    }

    postOneToWatch(req, res) {
        console.log(req.body);
        MongoConnect('ToWatch')
            .then(
                function(collection) {
                    collection.insert(req.body, function(results) {
                        res.send(results);
                    });
                }
            )
            .catch(function() {
                res.send("ERROR");
            });
    }

    updateToWatch(req, res) {
        console.log(req.body);
        MongoConnect('Users')
            .then(
                function(collection) {
                    collection.update(req.body, function(results) {
                        res.send(results);
                    });
                }
            )
            .catch(function() {
                res.send("ERROR");
            });
    }

}

module.exports = new toWatch();