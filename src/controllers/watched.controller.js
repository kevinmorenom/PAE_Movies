const express = require('express');
const axios = require('axios');
const MongoConnect = require('./db.controller');
if (process.env.NODE_ENV === 'dev') {
    require('dotenv').config();
}

const apiUrl = process.env.API_URL;
const apiKey = process.env.API_KEY;
const Token = require('./../models/token');

class Watched {

    getWatched(req, res) {
        let userMail = '';
        Token.findUserByToken(req.headers.authorization).then(user => {
            userMail = user.correo;
            console.log({ user });
        }).catch(err => {
            console.log(err);
        });
        MongoConnect('Watched')
            .then(
                function(collection) {
                    collection.find({ "correo": userMail }, function(results) {
                        res.send(results);
                    });
                }
            )
            .catch(function() {
                res.send("ERROR");
            });
    }

    postWatched(req, res) {
        let userMail = '';
        Token.findUserByToken(req.headers.authorization).then(user => {
            userMail = user.correo;
            console.log({ user });
        }).catch(err => {
            console.log(err);
        });
        console.log(req.body);
        MongoConnect('Watched')
            .then(
                function(collection) {
                    collection.insert({...req.body, correo: userMail }, function(results) {
                        console.log(userMail + ' Vio la pelicula: ' + req.body.original_title);
                        res.send(results);
                    });
                }
            )
            .catch(function() {
                res.send("ERROR");
            });
    }

    deleteWatched(req, res) {
        console.log(req.body);
        MongoConnect('Watched')
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

    getOne(req, res) {
        const url = `${apiUrl}/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
        axios.get(url).then(response => {
            res.render('popular', {
                title: response.data.results[0].title,
                popularity: response.data.results[0].popularity,
                poster: 'http://image.tmdb.org/t/p/original/' + response.data.results[0].poster_path,
                language: response.data.results[0].original_language
            });
        }).catch(err => {
            res.send('Failure');
            res.end();
        });
    }

    getPopular(req, res) {
        const url = `${apiUrl}/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
        axios.get(url).then(response => {
            res.send(response.data.results
                // popularity: response.data.results[0].popularity,
                // poster: 'http://image.tmdb.org/t/p/original/' + response.data.results[0].poster_path,
                // language: response.data.results[0].original_language
            );
        }).catch(err => {
            res.send('Failure');
            res.end();
        });
    }

}

module.exports = new Watched();