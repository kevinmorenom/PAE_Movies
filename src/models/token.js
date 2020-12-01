const crypto = require('crypto');
const db = require('./../controllers/db.controller');
const DBModel = require('./db');

const User = require('./user');

class Token extends DBModel {

    constructor() {
        super('tokens');
    }

    validate(token, userId) {
        const now = new Date().getTime();
        return this.findOne({
            userId: this.objectId(userId),
            token: token,
            expire_date: { $gt: now }
        });
    }

    create(userId) {
        const date = new Date();
        const expire_date = date.setHours(date.getHours() + 1);
        const token = crypto.scryptSync(userId + new Date().getTime(), 'salt', 48).toString('hex');

        return super.create({
            userId: userId,
            token: token,
            expire_date: expire_date
        }, { timestamps: false });
    }

    findByToken(token) {
        const now = new Date().getTime();
        return this.findOne({
            token: token,
            expire_date: { $gt: now }
        });
    }

    findUserByToken(token) {
        return new Promise((resolve, reject) => {
            this.findByToken(token).then(response => {
                // console.log("resultado de FBT", response);
                if (response) {
                    User.findById(response.userId).then(user => {
                        resolve(user);
                    }).catch(err => {
                        console.log('no hay token valido');
                        console.log(err);
                    })
                }
            }).catch(err => {
                console.log('no hay token valido');
                console.log(err);
            })
        })
    }
}

module.exports = new Token();
// const crypto = require('crypto');
// const db = require('./../controllers/db.controller');

// class Token {

//     collection;

//     constructor() {
//         db('tokens').then(collection => {
//             this.collection = collection;
//         }).catch(err => {
//             res.send(err);
//         })
//     }

//     validate(token, userId) {
//         return this.collection.findOne({
//             userId: userId,
//             token: token
//         });
//     }

//     create(userId) {
//         console.log("create token", userId);
//         const date = new Date();
//         const expire_date = date.setHours(date.getHours() + 1);
//         const token = crypto.scryptSync(userId + new Date().getTime(), 'salt', 48).toString('hex');
//         return this.collection.insertOne({
//             userId: userId,
//             token: token,
//             expire_date: expire_date
//         });
//     }

//     findByToken(token) {
//         console.log(this.collection);
//         const now = new Date().getTime();
//         return this.collection.findOne({
//             token: token,
//             expire_date: { $gt: now }
//         });
//     }

//     findUserByToken(token) {
//         console.log(token);
//     }
// }

// module.exports = new Token();