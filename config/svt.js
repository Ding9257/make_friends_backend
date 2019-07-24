module.exports = {
    mongoDb: {
        userName: 'root',
        password: '123qwe!@#QWE',
        host: 'localhost:27017/test',
        options: {
            useNewUrlParser: true,
            w: 1,                 // 写的复制服务器数
            wtimeout: 500,        // 写的超时时间
            j: false,              // 写等待日志磁盘同步
            keepAlive: 2,
            connectTimeoutMS: 30000,
            socketTimeoutMS: 500,
            auto_reconnect: true,
            poolSize: 5,// 每个服务器连接数
            // 'replicaSet': 'mongoreplset'// 副本集名字
        }
    },
    system: {
        name: 'makeFriendsBackend',
        notLogInRange: 5000,
        // 匹配爱好数量
        matchHobbiesCount: 3
    },
    port: 4020
};

