const express = require('express');
const axios = require('axios');
const MongoConnect = require('./db.controller');
require('dotenv').config();

const apiUrl = process.env.API_URL;
const apiKey = process.env.API_KEY;

class Watched {

    getWatched(req, res) {
        MongoConnect('Watched')
            .then(
                function(collection) {
                    collection.find(req.body, function(results) {
                        res.render('index', {
                            body: JSON.stringify(results)

                        });
                    });
                }
            )
            .catch(function() {
                res.send("ERROR");
            });
    }

    postWatched(req, res) {
        console.log(req.body);
        MongoConnect('Watched')
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