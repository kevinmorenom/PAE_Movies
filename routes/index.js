const express = require('express');
const router = express.Router();
const movieController = require('./../src/controllers/movie.controller');


router.get('/', movieController.getOneUser);

/**
 * @swagger
 * /:
 *  get:
 *      description: get from Database
 *      responses: 
 *          200:
 *              description: get Data from DataBase and render with handlebars
 */
router.get('/getUser', movieController.getOneUser);

/**
 * @swagger
 * /:
 *  post:
 *      description: Post a new User to Database
 *      responses: 
 *          200:
 *              description: Post user to DataBase
 */
router.post('/postUser', movieController.postOneUser);

/**
 * @swagger
 * /:
 *  delete:
 *      description: delete a new User to Database
 *      responses: 
 *          200:
 *              description: delete user to DataBase
 */
router.delete('/deleteUser', movieController.deleteUser);

/**
 * @swagger
 * /:
 *  get:
 *      description: get Watched List from Database
 *      responses: 
 *          200:
 *              description: get Data from DataBase and render with handlebars
 */
router.get('/getWatched', movieController.getWatched);

/**
 * @swagger
 * /:
 *  post:
 *      description: get Watched List from Database
 *      responses: 
 *          200:
 *              description: get Data from DataBase and render with handlebars
 */
router.post('/postWatched', movieController.postWatched);

/**
 * @swagger
 * /:
 *  delete:
 *      description: delete Watched Movie from Database
 *      responses: 
 *          200:
 *              description: delete 
 */
router.delete('/deleteWatched', movieController.deleteWatched);

/**
 * @swagger
 * /:
 *  get:
 *      description: get 2 Watch list from Database
 *      responses: 
 *          200:
 *              description: get Data from DataBase and render with handlebars
 */
router.get('/toWatch', movieController.getOneToWatch);

/**
 * @swagger
 * /:
 *  post:
 *      description: create a To Watch List for a User 
 *      responses: 
 *          200:
 *              description: success
 */
router.post('/toWatch', movieController.postOneToWatch);

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