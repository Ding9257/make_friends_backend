class DAL {

    constructor(Model) {
        this.Model = Model;
    }

    /**
     * 添加一个或多个
     * @param object Array|Object
     * @param options
     * @returns {Object}
     */
    create(doc, options) {
        let model = new this.Model(doc);
        return this.create(model, options);
    }

    /**
     * 添加一个
     * @param doc Object
     * @param options
     * @returns {Promise}
     */
    save(doc, options) {
        let model = new this.Model(doc);
        return model.save(options);
    }

    /**
     * 删除
     * @param conditions
     * @param options
     * @returns {Query}
     */
    delete(conditions, options) {
        return this.Model.deleteMany(conditions, options);
    }

    findAll(conditions = {}, projection = null, options = null) {
        return this.Model.find(conditions, projection, options);
    }

    findOne(conditions, projection = null, options = null) {
        return this.Model.findOne(conditions, projection, options);
    }

    findById(id, projection = null, options = null) {
        return this.Model.findById(id, projection, options);
    }

    count(conditions) {
        return this.Model.countDocuments(conditions);
    }

    update(conditions, doc, options = null) {
        return this.Model.update(conditions, doc, options);
    }

    aggregate(pipeline) {
        return this.Model.aggregate(pipeline);
    }

}

module.exports = DAL;