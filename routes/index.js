const express = require('express');
const router = express.Router();
const movieController = require('./../src/controllers/movie.controller');

/**
 * @swagger
 * /:
 *  get:
 *      description: get from Database
 *      responses: 
 *          200:
 *              description: get Data from DataBase and render with handlebars
 */
router.get('/', movieController.getAll);

/**
 * @swagger
 * /popular:
 *  get:
 *      description: get from API
 *      responses: 
 *          200:
 *              description: get data from API and render  with handlebars 
 */
router.get('/popular', movieController.getOne);

module.exports = router;