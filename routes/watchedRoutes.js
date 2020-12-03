const express = require("express");
const router = express.Router();
const watchedController = require('../src/controllers/watched.controller');




/**
 * @swagger
 * /:
 *  get:
 *      description: get Watched movies of a user according to the current token
 *      responses: 
 *          200:
 *              description: an array with all the watched movies by the current user
 */
router.get('/get', watchedController.getWatched);

/**
 * @swagger
 * /:
 *  post:
 *      description:Post in DB a watched movie by the user with the current token
 *      responses: 
 *          200:
 *              description: success
 */
router.post('/post', watchedController.postWatched);

/**
 * @swagger
 * /:
 *  delete:
 *      description: Delete a movie from the Watched list of the user with the current token
 *      responses: 
 *          200:
 *              description: movie deleted
 */
router.delete('/delete', watchedController.deleteWatched);



module.exports = router;