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
 *              description: user registered correctly
 */
router.post('/post', usersController.postOneUser);

/**
 * @swagger
 * /:
 *  delete:
 *      description: delete a user from the database
 *      responses: 
 *          200:
 *              description: user deleted
 */
router.delete('/delete', usersController.deleteUser);

/**
 * @swagger
 * /:
 *  put:
 *      description: update a User password
 *      responses: 
 *          200:
 *              description: password updated
 */
router.put('/update/:usuario', usersController.updateUser);

/**
 * @swagger
 * /:
 *  post:
 *      description: User Login
 *      responses: 
 *          200:
 *              description: login succesfull,send and post token in db
 */
router.post('/login', usersController.login);

/**
 * @swagger
 * /:
 *  post:
 *      description: User Login with Google
 *      responses: 
 *          200:
 *              description: login succesfull,send and post token in db
 */
router.post('/login/google', usersController.googleLogin);

/**
 * @swagger
 * /:
 *  get:
 *      description: get the user by the current token
 *      responses: 
 *          200:
 *              description: data of the current user
 */
router.get('/getByToken', usersController.getUserByToken);

/**
 * @swagger
 * /:
 *  put:
 *      description: update the current User´s password
 *      responses: 
 *          200:
 *              description: password updated
 */
router.put('/update', usersController.setPassword);


module.exports = router;