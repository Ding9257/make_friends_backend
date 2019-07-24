const {Schema, model} = require('mongoose');

const session = new Schema({
    token: {type: String},
    userId: {type: String},
    user: Object,
    updatedAt: {
        default: new Date(),
        expires: 60 * 60 * 24 * 7, // 单位秒
        type: Date
    }
});
module.exports = model('sessions', session);