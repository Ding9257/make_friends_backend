const bunyan = require('bunyan');

class loggerUtil {
    constructor() {
        this.logger = bunyan.createLogger({
            name: 'makeFriendsBackend',
            serializers: {
                err: bunyan.stdSerializers.err
            },
            streams: [
                {level: 'info', stream: process.stdout},
                {level: 'error', type: 'rotating-file', path: './logs/rf-error.log', period: '1d', count: 30},
                {level: 'info', type: 'rotating-file', path: './logs/rf-info.log', period: '1d', count: 30}
            ]
        });
    }

    /**
     *
     * @param params 参数
     * @param data 数据
     * @param desc 描述
     * @param key
     * @param user 用户
     * @return {*|void}
     */
    info({params, data, desc, key, user}) {
        return this.logger.info({params, data, desc, key, user});
    }

    error({params, data, desc, key, user, error}) {
        return this.logger.error({params, data, desc, key, user, error});
    }
}

module.exports = new loggerUtil();