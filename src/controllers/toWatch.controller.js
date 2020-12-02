const express = require('express');
const axios = require('axios');
const MongoConnect = require('./db.controller');
const Token = require('../models/token');
const apiUrl = process.env.API_URL;
const apiKey = process.env.API_KEY;

if (process.env.NODE_ENV === 'dev') {
    require('dotenv').config();
}

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

    postToWatch(req, res) {
        let userMail = '';
        Token.findUserByToken(req.headers.authorization).then(user => {
            userMail = user.correo;
            console.log({
                user
            });
        }).catch(err => {
            console.log(err);
        });
        console.log(req.body);
        MongoConnect('ToWatch')
            .then(
                function(collection) {
                    collection.insert({
                        ...req.body,
                        correo: userMail
                    }, function(results) {
                        console.log(userMail + ' Agregó la pelicula: ' + req.body.original_title);
                        res.send(results);
                    });
                }
            )
            .catch(function() {
                res.send("ERROR");
            });
    }

    getToWatch(req, res) {
        let userMail = '';
        Token.findUserByToken(req.headers.authorization).then(user => {
            userMail = user.correo;
            console.log(userMail);
            console.log({
                user
            });
        }).catch(err => {
            console.log(err);
        });
        MongoConnect('ToWatch')
            .then(
                function(collection) {
                    collection.find({
                        "correo": userMail
                    }, function(results) {
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

    deleteToWatch(req, res) {
        let userMail = '';
        Token.findUserByToken(req.headers.authorization).then(user => {
            userMail = user.correo;
            console.log({
                user
            });
        }).catch(err => {
            console.log(err);
        });
        console.log('Correo', userMail);
        console.log("This is the body", req.body);

        MongoConnect('ToWatch')
            .then(
                function(collection) {
                    const idInt = parseInt(req.params.id)
                    console.log("INDID:", idInt)
                    console.log("USERMAIEL:", userMail);
                    collection.delete({
                            id: idInt,
                            correo: userMail
                        },
                        function(results) {
                            console.log('This are the results:', results)
                            res.send(results);
                        });
                }
            )
            .catch(function(err) {
                console.log(err)
                res.send("ERROR");
            });
    }

}

module.exports = new toWatch();