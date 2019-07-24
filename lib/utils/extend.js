/**
 * 判断类型 返回结果都是小写  object string array
 * @return {*}
 */
Object.prototype.typeof = function () {
    let obj = this;
    if (obj == null) {
        return String(obj);
    }
    let class2type = {
        '[object Boolean]': 'boolean',
        '[object Number]': 'number',
        '[object String]': 'string',
        '[object Function]': 'function',
        '[object Array]': 'array',
        '[object Date]': 'date',
        '[object RegExp]': 'regexp',
        '[object Object]': 'object',
        '[object Error]': 'error'
    };
    return typeof obj === 'object' || typeof obj === 'function' ? class2type[Object.prototype.toString.call(obj)] || 'object' : typeof obj;
};

Object.prototype.isEmpty = function () {
    let o = this;
    if (o == undefined) {
        return true;
    }
    if (o == null) {
        return true;
    }
    if (o === '') {
        return true;
    }
    if (o.typeof(o) == 'object') {
        for (let x in o) {
            return false;
        }
        return true;
    }
    if (o.typeof(o) == 'array') {
        if (o.length == 0) {
            return true;
        }
        return false;
    }
    return false;
};