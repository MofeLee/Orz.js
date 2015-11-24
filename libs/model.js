'use strict';
const co = require('co');
const _ = require('lodash');

function Model(knex, name, attributes) {
    this.knex = knex;
    this.name = name;
    this.attributes = attributes;
}

var service = {
    query: query,
    findAll: findAll,
    findById: findById,
    create: create,
    updateById: updateById,
    destroyById: destroyById,
    count: count
};

_.assign(Model.prototype, service);


function query(sql) {
    return this.knex.raw(sql);
}

function findAll() {
    return this.knex(this.name);
}

function findById(id) {
    return this.knex(this.name)
        .where('id', id);
}

function create(obj) {
    return this.knex(this.name)
        .insert(obj);
}

function updateById(id, obj) {
    return this.knex(this.name)
        .where('id', id)
        .update(obj);
}

function destroyById(id) {
    return this.knex(this.name)
        .where('id', id)
        .del();
}

function count() {
    var self = this;

    return co(function*() {
        var data = yield self.knex(self.name)
            .count('id as count');
        return data[0].count;
    });
}

module.exports = Model;
