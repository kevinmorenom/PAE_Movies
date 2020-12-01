const express = require('express');
const router = express.Router();

const movieController = require('../src/controllers/movie.controller');
const token = require('../src/models/token');
const userRoutes = require("./userRoutes.js");
const toWatchRoutes = require("./toWatchRoutes.js");
const watchedRoutes = require("./watchedRoutes.js");
const movieRoutes = require("./movieRoutes.js");

function authMiddleware(req, res, next) {
    token.findByToken(req.headers.authorization).then(response => {
        // console.log("response: ", response)
        if (response) {
            next();
        } else {
            res.status(401).send();
        }
    }).catch(err => {
        res.status(401).send();
    })
}

router.use("/user", userRoutes);
router.use("/toWatch", authMiddleware, toWatchRoutes);
router.use("/watched", authMiddleware, watchedRoutes);
router.use("/movie", authMiddleware, movieRoutes);
// router.use("/movie", movieRoutes);
router.get('/', movieController.getOneBack);

module.exports = router;