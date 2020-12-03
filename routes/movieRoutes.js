const express = require("express");
const router = express.Router();
const movieController = require('../src/controllers/movie.controller');


/**
 * @swagger
 * /movie/getOneBack:
 *  get:
 *      description: get one movie from API
 *      responses: 
 *          200:
 *              description: get data from API and render with handlebars in backend just to check connection.
 */
router.get('/getOneBack', movieController.getOneBack);

/**
 * @swagger
 * /movie/getOne/id:
 *  get:
 *      description: get a specfific movie from de API by id
 *      responses: 
 *          200:
 *              description: The json with the data of the requested movie
 */
router.get('/getOne/:id', movieController.getOne);

/**
 * @swagger
 * /movie/populars:
 *  get:
 *      description: get popular movies API
 *      responses: 
 *          200:
 *              description: JSON with all the popular movies in the API
 */
router.get('/populars', movieController.getPopular);

/**
 * @swagger
 * /movie/search:
 *  get:
 *      description: search movies from API
 *      responses: 
 *          200:
 *              description:Array of movies matching title with query string
 */
router.get('/search', movieController.search);

/**
 * @swagger
 * /movie/similar:
 *  get:
 *      description: get similar movies from API
 *      responses: 
 *          200:
 *              description:Array of movies similar to the current movie
 */
router.get('/similar', movieController.getSimilar);

/**
 * @swagger
 * /movie/get/category:
 *  get:
 *      description: get movies from API depending the category
 *      responses: 
 *          200:
 *              description:Array of movies matching the category
 */
router.get('/get/:category?', movieController.getMovies);

module.exports = router;