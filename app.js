'use strict';
require('./models');
require('./lib/utils/extend');
const mongoose = require('mongoose');

function start() {
    const config = require('./config');
    const koa = require('koa');
    const Router = require('koa-router');
    const bodyParser = require('koa-bodyparser');
    const compress = require('koa-compress');
    const logger = require('./lib/middleware/loggerMiddleware');

    let app = new koa();
    app.use(bodyParser());
    app.use(compress());
    app.use(logger());

    const routes = require('./routers');

    let routerManage = new Router();
    app.use(routerManage.routes()).use(routerManage.allowedMethods());
    routes.api(routerManage);

    console.log('监听端口号为：', config.port);
    app.listen(config.port, '0.0.0.0');
}

mongoose.connection.once('open', function () {
    console.log('Mongoose connected to');
    start();
});

mongoose.connection.once('close', function (err) {
    console.log('Mongoose connection error: ' + err);
});

mongoose.connection.once('error', function (err) {
    console.log(err.toString());
    start();
});