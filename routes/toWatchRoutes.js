const express = require("express");
const router = express.Router();
const toWatchController = require('./../src/controllers/toWatch.controller');


/**
 * @swagger
 * /toWatch/get:
 *  get:
 *      description: get movies from API depending the category
 *      responses: 
 *          200:
 *              description:Array of movies matching the category
 */
router.get('/get', toWatchController.getToWatch);


/**
 * @swagger
 * /toWatch/post:
 *  get:
 *      description: get movies from API depending the category
 *      responses: 
 *          200:
 *              description:Array of movies matching the category
 */
router.post('/post', toWatchController.postToWatch);

/**
 * @swagger
 * /toWatch/delete/id:
 *  get:
 *      description: get movies from API depending the category
 *      responses: 
 *          200:
 *              description:Array of movies matching the category
 */
router.delete('/delete/:id', toWatchController.deleteToWatch);


module.exports = router;