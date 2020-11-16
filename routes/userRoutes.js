const express = require("express");
const router = express.Router();
const usersController = require('./../src/controllers/users.controller');


/**
 * @swagger
 * /:
 *  get:
 *      description: get from Database
 *      responses: 
 *          200:
 *              description: get Data from DataBase and render with handlebars
 */
router.get('/get', usersController.getOneUser);

/**
 * @swagger
 * /:
 *  post:
 *      description: Post a new User to Database
 *      responses: 
 *          200:
 *              description: Post user to DataBase
 */
router.post('/post', usersController.postOneUser);

/**
 * @swagger
 * /:
 *  delete:
 *      description: delete a new User to Database
 *      responses: 
 *          200:
 *              description: delete user to DataBase
 */
router.delete('/delete', usersController.deleteUser);

/**
 * @swagger
 * /:
 *  put:
 *      description: update a User data
 *      responses: 
 *          200:
 *              description: updated user
 */
router.put('/update/:usuario', usersController.updateUser);

/**
 * @swagger
 * /:
 *  post:
 *      description: User Login
 *      responses: 
 *          200:
 *              description: post token in db
 */
router.post('/login', usersController.login);

/**
 * @swagger
 * /:
 *  post:
 *      description: User Login
 *      responses: 
 *          200:
 *              description: post token in db
 */
router.post('/login/google', usersController.googleLogin);

module.exports = router;