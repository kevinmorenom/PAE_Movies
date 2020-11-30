const express = require("express");
const router = express.Router();
const toWatchController = require('./../src/controllers/toWatch.controller');


/**
 * @swagger
 * /:
 *  get:
 *      description: get 2 Watch list from Database
 *      responses: 
 *          200:
 *              description: get Data from DataBase and render with handlebars
 */
router.get('/get', toWatchController.getToWatch);


/**
 * @swagger
 * /:
 *  post:
 *      description: create a To Watch List for a User 
 *      responses: 
 *          200:
 *              description: success
 */
router.post('/post', toWatchController.postToWatch);

/**
 * @swagger
 * /:
 *  delete:
 *      description: create a To Watch List for a User 
 *      responses: 
 *          200:
 *              description: success
 */
router.delete('/delete/:id', toWatchController.deleteToWatch);


module.exports = router;