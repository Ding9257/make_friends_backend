'use strict';

const util = require('./../utils/utils');
const redis = require('./../redis');
const utilResult = require('./../../lib/utils/result');

let authCheck = async (ctx, next) => {
    let result = utilResult.buildResult({message: 'login expired'});
    let Authorization = ctx.header.authorization;// 'Bearer 654654654654645'

    if (util.isEmpty(Authorization)) {
        ctx.status = 401;
        return ctx.body = result;
    }
    let token = util.oauth2Token(Authorization);
    let user = await redis.getLoginUser(token);

    if (util.isEmpty(user)) {
        ctx.status = 401;
        return ctx.body = result;
    } else {
        await redis.updateLoginUser(user);
        ctx.user = user;
    }
    await next();
};
module.exports = authCheck;