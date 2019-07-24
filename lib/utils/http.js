'use strict';

const request = require('request-promise');

class httpUtil {
    http(option) {
        return request(option);
    }

    send({url, headers = {}, method = 'GET', body = null}) {
        let option = {
            method: method,
            requestCert: false,
            rejectUnauthorized: false,
            json: true,
            body: body,
            uri: url,
            headers: headers
        };

        return request(option);
    }
}

module.exports = new httpUtil();