const express = require("express");
const router = express.Router();
const toWatchController = require('./../src/controllers/toWatch.controller');


/**
 * @swagger
 * /:
 *  get:
 *      description: get 2 Watch list of a user according to the current token
 *      responses: 
 *          200:
 *              description: an array with all de 2 Watch movies stored in database
 */
router.get('/get', toWatchController.getToWatch);


/**
 * @swagger
 * /:
 *  post:
 *      description:Post in DB a movie ToWatch to the user with the current token
 *      responses: 
 *          200:
 *              description: success
 */
router.post('/post', toWatchController.postToWatch);

/**
 * @swagger
 * /:
 *  delete:
 *      description: Delete a movie from the ToWatch list of the user with the current token
 *      responses: 
 *          200:
 *              description: success
 */
router.delete('/delete/:id', toWatchController.deleteToWatch);


module.exports = router;