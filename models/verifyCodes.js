const {Schema, model} = require('mongoose');

const verifyCodes = new Schema({
    // _id
    mobile: {type: String, comment: '手机号'},
    countryCode: {type: String, comment: '国际区号'},
    code: {type: String, comment: '验证码'},
    createAt: {
        type: Date, default: new Date(), expires: 60 * 10, comment: '创建时间'
    }
});
module.exports = model('verifyCodes', verifyCodes);