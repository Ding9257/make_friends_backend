const bunyan = require('bunyan');
const config = require('./../../config');
const {code, codeMsg} = require('./../../config/httpStatusCode');
const resultService = require('./../../services/ResultService');

function reqSerializer(ctx) {
    return {
        url: ctx.url,
        headers: ctx.request.header,
        method: ctx.method,
        ip: ctx.ip,
        protocol: ctx.protocol,
        originalUrl: ctx.originalUrl,
        query: ctx.query,
        body: ctx.request.body
    };
}

function resSerializer(ctx) {
    return {
        statusCode: ctx.status,
        body: ctx.body
    };
}

const logger1 = bunyan.createLogger({
    name: config.system.name,
    serializers: {
        req: reqSerializer,
        res: resSerializer,
        err: bunyan.stdSerializers.err
    },
    streams: [
        {level: 'info', stream: process.stdout},
        {level: 'error', type: 'rotating-file', path: './logs/rf-error.log', period: '1d', count: 30},
        {level: 'info', type: 'rotating-file', path: './logs/rf-info.log', period: '1d', count: 30}
    ]
});

module.exports = function log() {
    return async (ctx, next) => {
        try {
            await next();
            logger1.info({req: ctx, res: ctx}, '请求成功');
        } catch (err) {
            logger1.error({req: ctx, res: ctx, err: err}, '错误');
            if (!err.code.isEmpty()) return ctx.body = resultService.fail(err.code, codeMsg[err.code]);
            else return ctx.body = resultService.fail(code.system, codeMsg[code.system]);
        }
    };
};
