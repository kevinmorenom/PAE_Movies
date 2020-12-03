const express = require("express");
const router = express.Router();
const watchedController = require('../src/controllers/watched.controller');




/**
 * @swagger
 * /:
 *  get:
 *      description: get Watched List from Database
 *      responses: 
 *          200:
 *              description: get Data from DataBase and render with handlebars
 */
router.get('/get', watchedController.getWatched);

/**
 * @swagger
 * /:
 *  post:
 *      description: get Watched List from Database
 *      responses: 
 *          200:
 *              description: get Data from DataBase and render with handlebars
 */
router.post('/post', watchedController.postWatched);

/**
 * @swagger
 * /:
 *  delete:
 *      description: delete Watched watched from Database
 *      responses: 
 *          200:
 *              description: delete 
 */
router.delete('/delete', watchedController.deleteWatched);



module.exports = router;