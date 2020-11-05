const express = require('express');
const router = express.Router();

const movieController = require('../src/controllers/movie.controller');

const userRoutes = require("./userRoutes.js");
const toWatchRoutes = require("./toWatchRoutes.js");
const watchedRoutes = require("./watchedRoutes.js");
const movieRoutes = require("./movieRoutes.js");


router.use("/user", userRoutes);
router.use("/toWatch", toWatchRoutes);
router.use("/watched", watchedRoutes);
router.use("/movie", movieRoutes);
router.get('/', movieController.getOne);

module.exports = router;