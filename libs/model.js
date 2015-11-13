'use strict';
const co = require('co');

function Model(knex, name, attributes) {
    this.knex = knex;
    this.name = name;
    this.attributes = attributes;
}


Model.prototype.query = function(sql) {
    return this.knex.raw(sql);
};

Model.prototype.findAll = function() {
    return this.knex(this.name);
};

Model.prototype.findById = function(id) {
    return this.knex(this.name)
        .where('id', id);
};

Model.prototype.count = function() {
    var self = this;
    
    return co(function*(){
        var data = yield self.knex(self.name)
                            .count('id as count');
        return data[0].count;
    });
};

module.exports = Model;
