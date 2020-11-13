const crypto = require('crypto');
const db = require('./../controllers/db.controller');

class Token {

    collection;

    constructor() {
        db('tokens').then(collection => {
            this.collection = collection;
        }).catch(err => {
            res.send(err);
        })
    }

    validate(token, userId) {
        return this.collection.findOne({
            userId: userId,
            token: token
        });
    }

    create(userId) {
        const date = new Date();
        const expire_date = date.setHours(date.getHours() + 1);
        const token = crypto.scryptSync(userId + new Date().getTime(), 'salt', 48).toString('hex');
        return this.collection.insertOne({
            userId: userId,
            token: token,
            expire_date: expire_date
        });
    }
}

module.exports = new Token();