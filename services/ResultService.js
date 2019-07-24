const {code, codeMsg} = require('./../config/httpStatusCode');

class Service {
    body({data, message, code}) {
        return {message: message, code: code, data: data};
    }

    success(data, message) {
        return this.body({data, message: message || codeMsg[code.success], code: code.success});
    }

    successMsg(message) {
        return this.body({data: null, message: message || codeMsg[code.success], code: code.success});
    }

    fail(code1, message) {
        return this.body({data: null, message: message || codeMsg[code1], code: code1});
    }
}

module.exports = new Service();