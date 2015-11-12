'use strict';
const debug = require('debug')('model');
const squel = require('squel');

function Model(knex, name, attributes) {
    this.knex = knex;
    this.name = name;
    this.attributes = attributes;
}


Model.prototype.query = function(sql){
    return this.knex(sql);
};

Model.prototype.findAll = function() {
    return this.knex(this.name);
};

module.exports = Model;
