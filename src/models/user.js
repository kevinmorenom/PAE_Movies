const DBModel = require('./db');

class User extends DBModel {

    constructor() {
        super('Users');
    }

    validate(username, password) {
        return this.findOne({
            correo: username,
            contraseña: password
        })
    }

}

module.exports = new User();