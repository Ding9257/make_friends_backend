const crypto = require('crypto');
const uuid = require('uuid/v4');

class Tool {
    md5(content) {
        let md5 = crypto.createHash('md5');
        md5.update(content);
        return md5.digest('hex');
    }

    Error({code = 100000, message = '错误'}) {
        let error = new Error();
        error.code = code;
        error.message = message;
        return error;
    }

    uuid() {
        return uuid().replace(/-/g, '');
    }
}

module.exports = new Tool();