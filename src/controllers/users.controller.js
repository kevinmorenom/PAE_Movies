const express = require('express');
const axios = require('axios');
const MongoConnect = require('./db.controller');
require('dotenv').config();

const apiUrl = process.env.API_URL;
const apiKey = process.env.API_KEY;

class Users {
    getOneUser(req, res) {
        MongoConnect('Users')
            .then(
                function(collection) {
                    collection.find(req.body, function(results) {
                        console.log(req.body);
                        console.log(results);

                        res.send(results);
                        // res.render('index', {
                        //     body: results[0].correo
                        // });
                    });
                }
            )
            .catch(function() {
                res.send("ERROR");
            });
    }

    postOneUser(req, res) {
        console.log(req.body);
        MongoConnect('Users')
            .then(
                function(collection) {
                    collection.insert(req.body, function(results) {
                        res.render('index', {
                            body: results
                        });
                    });
                }
            )
            .catch(function() {
                res.send("ERROR");
            });
    }

    deleteUser(req, res) {
        console.log(req.body);
        MongoConnect('Users')
            .then(
                function(collection) {
                    collection.delete(req.body, function(results) {
                        res.send('Deleted');
                    });
                }
            )
            .catch(function() {
                res.send("ERROR");
            });
    }

    updateUser(req, res) {
        console.log(req.params._id);
        console.log(req.body);
        MongoConnect('Users')
            .then(
                function(collection) {
                    collection.update(req.params._id, req.body, function(results) {
                        res.send(results);
                    });
                }
            )
            .catch(function() {
                res.send("ERROR");
            });
    }




}

module.exports = new Users();