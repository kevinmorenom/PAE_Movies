const express = require("express");
const router = express.Router();
const movieController = require('../src/controllers/movie.controller');


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

/**
 * @swagger
 * /popular:
 *  get:
 *      description: get from API
 *      responses: 
 *          200:
 *              description: get data from API and render  with handlebars 
 */
router.get('/populars', movieController.getPopular);

module.exports = router;