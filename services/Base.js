const DAL = require('./DAL');

class Base {
    constructor(Model) {
        this.DAL = new DAL(Model);
    }

    save(obj, options = {}) {
        obj.createAt = new Date();
        return this.DAL.save(obj, options);
    }

    update(conditions, doc, options = null) {
        doc.updateAt = new Date();
        return this.DAL.update(conditions, doc, options);
    }

    findOne(condition, constraints = null, option = {}) {
        return this.DAL.findOne(condition, constraints, option);
    }

    findAll(conditions = {}, projection = null, options = {}) {
        options.sort.isEmpty() ? options.sort = {_id: -1} : '';
        options.skip.isEmpty() ? '' : options.skip = +options.skip;
        options.limit.isEmpty() ? '' : options.limit = +options.limit;

        return this.DAL.findAll(conditions, projection, options);
    }

    updateById(id, doc, options = null) {
        return this.update({_id: id}, doc, options);
    }

    findById(id) {
        return this.DAL.findById(id);
    }

    delete(conditions, options = null) {
        return this.DAL.delete(conditions, options);
    }

    count(conditions) {
        return this.DAL.count(conditions);
    }

    aggregate(pipeline) {
        return this.DAL.aggregate(pipeline);
    }
}

module.exports = Base;