const express = require('express');
const axios = require('axios');
require('dotenv').config();


class News {
    getAll(req, res) {
        res.render('index', {
            hola: "adios"
        });
    }
}

module.exports = new News();