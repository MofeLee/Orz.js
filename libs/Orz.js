'use strict';
const mysql = require('mysql');
const debug = require('debug')('Orz');
const thunkify = require('thunkify');
const _ = require('lodash');
const Model = require('./model');

/**
 * 负责连接数据库,调度之类的
 */
function Orz(database, username, password, options) {
    var pool = mysql.createPool({
        host: options.host,
        user: username,
        password: password,
        database: database
    });

    this.pool = pool;
    this.db = {};
}

Orz.prototype.define = function(modelName, attributes) {
    var model = new Model(this.pool, modelName, attributes);

    this.db[modelName] = model;
    return model;
}

var orz = new Orz('orz_test', 'root', '', {
    host: 'localhost'
});

var tableName = 'test_table';

var model = orz.define(tableName, {});

model.findAll()
    .then(function(data){
        console.log(data);
    });

module.exports = Orz;
