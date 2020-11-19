const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
const db = require('./db.controller');
require('dotenv').config();

const apiUrl = process.env.API_URL;
const apiKey = process.env.API_KEY;
const Token = require('./../models/token');
const { OAuth2Client } = require('google-auth-library');
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

function getHashedPassword(pwd) {
    const hashedPassword = crypto.scryptSync(pwd, 'salt', 24).toString('hex');
    return hashedPassword;
}

class Users {
    getOneUser(req, res) {
        db('Users')
            .then(
                function(collection) {
                    collection.findOne(req.body, function(results) {
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
        db('Users')
            .then(
                function(collection) {
                    const hashedPassword = getHashedPassword(req.body.contraseña);
                    collection.insert({
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
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
        db('Users')
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
        db('Users')
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
        db('Users').then(collection => {
            const hashedPassword = getHashedPassword(req.body.contraseña);
            collection.findOne({
                correo: req.body.correo,
                contraseña: hashedPassword
            }).then(results => {
                if (results) {
                    Token.create(results._id).then(result => {
                        // console.log('Created token: ', result);
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

    googleLogin(req, res) {
            googleClient.verifyIdToken({
                idToken: req.body.idToken
            }).then(googleResponse => {
                const responseData = googleResponse.getPayload();
                const email = responseData.email;
                db('Users').then(collection => {
                    collection.findOne({ "email": email }).then(results => {
                        if (results) {
                            console.log('Found user: ', results);
                            if (!results.googleId) {
                                console.log('Does not have google ID');
                                db('users').then(collection => {
                                    collection.updateOne({ "email": email }, {
                                        $set: {
                                            googleId: req.body.id
                                        }
                                    }).then(results => {
                                        Token.create(results._id).then(result => {
                                                // console.log('Created token: ', result);
                                                res.send(result.ops[0]);
                                            }).catch(err => {
                                                console.log('Failed to create token', err);
                                                res.status(404).send();
                                            }) // res.send(results);
                                    });
                                }).catch(err => {
                                    res.send(err);
                                })
                            } else {
                                console.log('Already has google ID', results._id);
                                Token.create(results._id).then(result => {
                                    // console.log('Created token: ', result);
                                    res.send(result.ops[0]);
                                }).catch(err => {
                                    console.log('Failed to create token', err);
                                    res.status(404).send();
                                })
                            }
                        } else {
                            db('Users').then(collection => {
                                collection.insertOne({
                                    usuario: req.body.name,
                                    correo: req.body.email,
                                    googleId: req.body.id
                                }).then(result => {
                                    console.log("ya se creo el usuario", result.ops[0]._id);
                                    Token.create(result.ops[0]._id).then(result => {
                                        // console.log('Created token: ', result);
                                        res.send(result.ops[0]);
                                    }).catch(err => {
                                        console.log('Failed to create token', err);
                                        res.status(404).send();
                                    })
                                }).catch(err => {
                                    console.log('Error: ', err);
                                    res.status(400).send(err);
                                });
                            }).catch(err => {
                                console.log('Error', err);
                                res.status(400).send(err);
                            })
                        }
                    });
                }).catch(err => {
                    console.log('Failed to google login', err);;
                })
            }).catch(err => {
                res.status(400).send();
            });

        }
        /*googleLogin
        valido el token con google-auth-library
        si es valido..
            busco si existe el usuario con ese correo
                si si existe
                    y no tiene un googleId 
                        se lo agrego 
                        creo Token
                    y si si tiene googleId 
                        solo creo Token
                si no existe el usuario
                    creo el usuario con usuario,correo y googleId
                    creo el token
        si el token no es valido es error
        */

}

module.exports = new Users();