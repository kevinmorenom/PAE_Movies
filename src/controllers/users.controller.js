const express = require('express');
const axios = require('axios');
const crypto = require('crypto');
const db = require('./db.controller');
if (process.env.NODE_ENV === 'dev') {
    require('dotenv').config();
}

const apiUrl = process.env.API_URL;
const apiKey = process.env.API_KEY;
const Token = require('./../models/token');
const {
    OAuth2Client
} = require('google-auth-library');
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const User = require('./../models/user');

function getHashedPassword(pwd) {
    const hashedPassword = crypto.scryptSync(pwd, 'salt', 24).toString('hex');
    return hashedPassword;
}

class UserController {
    getOneUser(req, res) {
        db('Users')
            .then(
                function(collection) {
                    collection.findOne(req.body, function(results) {
                        // console.log(req.body);
                        // console.log(results);

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
            .catch(err => {
                res.send(err);
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
        const hashedPassword = getHashedPassword(req.body.contraseña);
        User.validate(req.body.correo, hashedPassword).then(result => {
            if (result) {
                Token.create(result._id).then(tokenResult => {
                    // console.log('Created token: ', tokenResult);
                    res.send(tokenResult.ops[0]);
                }).catch(err => {
                    console.log('Failed to create token', err);
                    res.status(404).send();
                });
            } else {
                console.log("Credenciales malas2", err);

                res.status(400).send();
            }
        }).catch(err => {
            console.log("Credenciales malas3", err);
            res.status(400).send();
        })
    }

    getOne(req, res) {
        console.log(req.query);
        User.findOne({
            email: req.query.email
        }).then(result => {
            res.send(result);
        }).catch(err => {
            res.status(400).send(err);
        })
    }

    googleLogin(req, res) {

        googleClient.verifyIdToken({
            idToken: req.body.idToken
        }).then(googleResponse => {
            const responseData = googleResponse.getPayload();
            const email = responseData.email;
            User.findOne({
                correo: email
            }).then(response => {
                if (response) {
                    console.log('Found existing user');
                    if (!response.googleId) {
                        console.log('Does not have google ID');
                        User.updateOne({
                            correo: email
                        }, {
                            $set: {
                                googleId: req.body.id
                            }
                        }).then(() => {
                            UserController.createToken(response._id, res);
                        }).catch(err => {
                            console.log('Failed to update user', err);
                        });
                    } else {
                        console.log('Already has google ID');
                        UserController.createToken(response._id, res);
                    }
                } else {
                    // Crear
                    console.log('This is a new user ', req.body);
                    User.create({
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        usuario: req.body.name,
                        correo: email,
                        photoUrl: req.body.photoUrl,
                        googleId: req.body.id
                    }).then(response => {
                        UserController.createToken(response.insertedId, res);
                    });
                }
            }).catch(err => {
                console.log(err);
                res.status(400).send();
            });
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
    si el token no es valido busco error
    */

    static createToken(userId, res) {
        // console.log('Will create token now');
        Token.create(userId).then(tokenResult => {
            // console.log('Created token: ', tokenResult);
            res.send(tokenResult.ops[0]);
        }).catch(err => {
            console.log('Failed to create token', err);
            res.status(404).send(err);
        })
    }

    getUserByToken(req, res) {
        Token.findUserByToken(req.headers.authorization).then(data => {
            res.send(data);
        }).catch(err => {
            console.log(err);
            res.status(404).send(err);
        })
    }

    setPassword(req, res) {
        let userMail = '';
        console.log('req', req.body)
        Token.findUserByToken(req.headers.authorization).then(user => {
            userMail = user.correo;
            const hashedPassword = getHashedPassword(req.body.contraseña);
            User.updateOne({
                correo: userMail
            }, {
                $set: {
                    contraseña: hashedPassword
                }
            }).then(response => {
                console.log("Cambio la contraseña")
                console.log('mail', userMail);
                res.send(response);
            }).catch(err => {
                console.log('Failed to update user', err);
            });
            console.log({
                user
            });
        }).catch(err => {
            console.log(err);
        });

    }

}

module.exports = new UserController();