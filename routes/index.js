const express = require('express');
const router = express.Router();
const movieController = require('./../src/controllers/movie.controller');

router.get('/', movieController.getAll);

module.exports = router;