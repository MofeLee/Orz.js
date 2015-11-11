const debug = require('debug')('model');
const squel = require('squel');

function Model(pool, name, attributes) {
    this.pool = pool;
    this.name = name;
    this.attributes = attributes;
}

Model.prototype.query = function(sql) {
    var self = this;
    return new Promise(function(resolve, reject) {
        debug(sql);
        self.pool.query(sql, function(err, rows, fields) {
            if (err) reject(err);
            resolve({
                rows: rows,
                fields: fields
            });
        })
    });

}

Model.prototype.findAll = function(options) {
    var expr = squel.select()
        .from(this.name);

    var sql = expr.toString();
    debug(sql);

    return this.query(sql);
}

module.exports = Model;
