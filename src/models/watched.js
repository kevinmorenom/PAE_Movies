const crypto = require('crypto');
const db = require('./../controllers/db.controller');
const DBModel = require('./db');

const User = require('./user');

class Watched extends DBModel {

    constructor() {
        super('Watched');
    }

    validate(token, userId) {
        const now = new Date().getTime();
        return this.findOne({
            userId: this.objectId(userId),
            token: token,
            expire_date: { $gt: now }
        });
    }


}

module.exports = new Watched();