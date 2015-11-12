'use strict';

function Model(knex, name, attributes) {
    this.knex = knex;
    this.name = name;
    this.attributes = attributes;
}


Model.prototype.query = function(sql){
    return this.knex.raw(sql);
};

Model.prototype.findAll = function() {
    return this.knex(this.name);
};

Model.prototype.findById = function(id) {
    return this.knex(this.name)
            .where('id', id);
};

module.exports = Model;
