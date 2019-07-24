'use strict';

const crypto = require('crypto');
const moment = require('moment');
const uuid = require('uuid/v4');

exports.sleep = (time) => {
    return new Promise(function (resolve) {
        setTimeout(function () {
            resolve();
        }, time);
    });
};

exports.formatCommonDate = function (date, format = 'YYYY-MM-DD HH:mm:ss') {
    if (!date) {
        date = new Date;
    }

    return moment(date).format(format);
};

exports.isEmpty = function (o) {
    if (o == undefined) {
        return true;
    }
    if (o == null) {
        return true;
    }
    if (o === '') {
        return true;
    }
    if (this.typeof(o) == 'object') {
        for (var x in o) {
            return false;
        }
        return true;
    }
    if (this.typeof(o) == 'array') {
        if (o.length == 0) {
            return true;
        }
        return false;
    }
    return false;
};

//验证手机号
exports.isMobile = function (val) {
    var myreg = /^[1][0-9]{10}$/;
    return (myreg.test(val));
};

exports.uuid = function () {
    return uuid().replace(/-/g, '');
};

exports.md5 = function (content) {
    var md5 = crypto.createHash('md5');
    md5.update(content);
    return md5.digest('hex');
};


exports.random = function (len) {
    let num = len;
    let random = '';
    for (let i = 0; i < num; i++) {
        random += Math.floor(Math.random() * 10);
    }
    return random;
};


/**
 * 返回结果都是小写  object string array
 */
exports.typeof = function (obj) {
    if (obj == null) {
        return String(obj);
    }
    let class2type = {};
    'Boolean Number String Function Array Date RegExp Object Error'.split(' ').forEach(function (e) {
        class2type['[object ' + e + ']'] = e.toLowerCase();
    });
    return typeof obj === 'object' || typeof obj === 'function' ?
        class2type[Object.prototype.toString.call(obj)] || 'object' :
        typeof obj;
};

exports.expError = function ({code = 'ssss', message = '错误'}) {
    let error = new Error();
    error.code = code;
    error.message = message;
    return error;
};
exports.getOrderNo = function () {
    let time = moment().format('YYYYMMDDHHmmssSSS');
    let random = this.random(4);
    return `${time}${random}`;
};

exports.longTime = function (time) {
    let ago = '', curTime = +new Date(), diff;
    diff = curTime - time;
    if (1000 * 60 > diff) {
        ago = 'just now';
    } else if (1000 * 60 <= diff && 1000 * 60 * 60 > diff) {
        let num = parseInt(diff / (1000 * 60));
        ago = num == 1 ? `${num} minute ago` : `${num} minutes ago`;
    } else if (1000 * 60 * 60 <= diff && 1000 * 60 * 60 * 24 > diff) {
        let num = parseInt(diff / (1000 * 60 * 60));
        ago = num == 1 ? `${num} hour ago` : `${num} hours ago`;
    } else if (1000 * 60 * 60 * 24 <= diff && 1000 * 60 * 60 * 24 * 30 > diff) {
        let num = parseInt(diff / (1000 * 60 * 60 * 24));
        ago = num == 1 ? `${num} day ago` : `${num} days ago`;
    } else if (1000 * 60 * 60 * 24 * 30 <= diff && 1000 * 60 * 60 * 24 * 30 * 12 > diff) {
        let num = parseInt(diff / (1000 * 60 * 60 * 24 * 30));
        ago = num == 1 ? `${num} month ago` : `${num} months ago`;
    } else {
        let num = parseInt(diff / (1000 * 60 * 60 * 24 * 30 * 12));
        ago = num == 1 ? `${num} year ago` : `${num} years ago`;
    }
    return ago;
};