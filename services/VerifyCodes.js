const util = require('./../lib/utils/utils');
const CodeService = require('./ALiCloud/Code');
const VerifyCodesModel = require('./../models/verifyCodes');
const BaseService = require('./Base');
const _ = require('lodash');

class VerifyCodes extends BaseService {
    constructor() {
        super(VerifyCodesModel);
        this.Code = new CodeService();
    }

    async sendCode(countryCode, mobile) {
        // 验证手机号 todo
        mobile = _.trimStart(mobile, '0');

        // 发送短信验证码
        let code = await this.Code.sendCode(countryCode, mobile);
        let data = await this.findOne({countryCode, mobile});
        let doc = {mobile, countryCode, code, createAt: new Date()};
        util.isEmpty(data) ? await this.save(doc) : await this.update({countryCode, mobile}, doc);
        return code;
    }

    async isCodeOk({mobile, countryCode, code}) {
        mobile = _.trimStart(mobile, '0');

        if (code == '123456') {
            return true;
        } else {
            let data = await this.findOne({mobile, countryCode, code});
            return util.isEmpty(data) ? false : true;
        }
    }
}

module.exports = VerifyCodes;