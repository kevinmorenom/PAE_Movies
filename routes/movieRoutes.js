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

/**
 * @swagger
 * /search:
 *  get:
 *      description: search movies from API
 *      responses: 
 *          200:
 *              description:Array of movies matching title with query string
 */
router.get('/search', movieController.search);

/**
 * @swagger
 * /similar:
 *  get:
 *      description: search movies from API
 *      responses: 
 *          200:
 *              description:Array of movies matching title with query string
 */
router.get('/similar', movieController.getSimilar);

module.exports = router;