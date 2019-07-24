const mongoDBConfig = require('./../config').mongoDb;
const mongoose = require('mongoose');

const ENV = process.env.NODE_ENV;
let url = `mongodb://${mongoDBConfig.userName}:${encodeURIComponent(mongoDBConfig.password)}@${mongoDBConfig.host}?authSource=admin`;
if (ENV === 'dev') {
    url = 'mongodb://localhost:27017/dating-backend';
    mongoose.set('debug', true);
}

const mongoDB = mongoose.connect(url, mongoDBConfig.options);
module.exports = mongoDB;
