const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
const MongoConnect = require('./db.controller');
require('dotenv').config();

const apiUrl = process.env.API_URL;
const apiKey = process.env.API_KEY;
const Token = require('./../models/token');

function getHashedPassword(pwd) {
    const hashedPassword = crypto.scryptSync(pwd, 'salt', 24).toString('hex');
    return hashedPassword;
}

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
                    const hashedPassword = getHashedPassword(req.body.contraseña);
                    collection.insert({
                        firstName: req.body.firstName,
                        lastName:req.body.lastName,
                        usuario: req.body.usuario,
                        correo: req.body.correo,
                        contraseña: hashedPassword,
                        foto: "",
                        vistas: 0
                    }, function(results) {
                        res.send(results);
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
        console.log(req.params.usuario);
        console.log(req.body);
        MongoConnect('Users')
            .then(
                function(collection) {
                    collection.update(req.params.usuario, req.body, function(results) {
                        res.send(results);
                    });
                }
            )
            .catch(function() {
                res.send("ERROR");
            });
    }

    login(req, res) {
        console.log(req.body);
        MongoConnect('Users').then(collection => {
            const hashedPassword = getHashedPassword(req.body.contraseña);
            collection.findOne({
                correo: req.body.correo,
                contraseña: hashedPassword
            }).then(results => {
                if (results) {
                    Token.create(results._id).then(result => {
                        console.log('Created token: ', result);
                        res.send(result.ops[0]);
                    }).catch(err => {
                        console.log('Failed to create token', err);
                        res.status(404).send();
                    })
                } else {
                    res.status(404).send();
                }
            }).catch(err => {
                console.log('Error: ', err);
                res.send(err);
            });
        }).catch(err => {
            res.send(err);
        })
    }




}

module.exports = new Users();