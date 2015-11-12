'use strict';
var knex = require('knex');
const debug = require('debug')('Orz');
const Model = require('./libs/model');

/**
 * 负责连接数据库,调度之类的
 */
function Orz(config) {
    this.config = config;

    this.knex = knex(config);

    this.db = {};
}

Orz.prototype.define = function(modelName, attributes) {
    var model = new Model(this.knex, modelName, attributes);

    debug('defined: ' + modelName);

    this.db[modelName] = model;
    return model;
};


module.exports = Orz;
