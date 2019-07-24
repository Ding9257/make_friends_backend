const Base = require('./Base');
const UsersModel = require('./../models/Users');

class Users extends Base {
    constructor() {
        super(UsersModel);
    }
}

module.exports = Users;