const express = require("express");
const router = express.Router();
const toWatchController = require('./../src/controllers/toWatch.controller');


/**
 * @swagger
 * /toWatch/get:
 *  get:
 *      description: get Watched movies of a user according to the current token
 *      responses: 
 *          200:
 *              description:an array with all the watched movies by the current user
 */
router.get('/get', toWatchController.getToWatch);


/**
 * @swagger
 * /toWatch/post:
 *  get:
 *      description: Post in DB a watched movie by the user with the current token
 *      responses: 
 *          200:
 *              description:success
 */
router.post('/post', toWatchController.postToWatch);

/**
 * @swagger
 * /toWatch/delete/id:
 *  get:
 *      description: Delete a movie from the Watched list of the user with the current token
 *      responses: 
 *          200:
 *              description:movie deleted
 */
router.delete('/delete/:id', toWatchController.deleteToWatch);


module.exports = router;