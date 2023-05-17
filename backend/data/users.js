const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;

const createUser = async (email, name, username, password) => {
    return "createUser"
}

const checkUser = async (username, password) => {
    return "checkUser"
}

module.exports = { createUser, checkUser }
