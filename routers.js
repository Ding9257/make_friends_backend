function ok(ctx) {
    return ctx.body = 'ok';
}

module.exports.api = function (router) {
    router.prefix('/api/');
    router.get('/', ok);
};