const ENV = process.env.NODE_ENV || 'dev';
module.exports = ENV == 'production' ? require('./production') : require('./svt');