const express = require('express');
const axios = require('axios');
const MongoConnect = require('./db.controller');
require('dotenv').config();

const apiUrl = process.env.API_URL;
const apiKey = process.env.API_KEY;

class News {
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


    getWatched(req, res) {
        MongoConnect('Watched')
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
        const url = `${apiUrl}popular?api_key=${apiKey}&language=en-US&page=1`;
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



}

module.exports = new News();