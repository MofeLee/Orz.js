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
}

Orz.prototype.query = function(sql){
    var self = this;
    return new Promise(function(resolve, reject){
        debug(sql);
        self.pool.query(sql, function(err, rows, fields){
            if(err) reject(err);
            resolve({
                rows: rows,
                fields: fields
            });
        })
    });
}

Orz.prototype.define = function(modelName, attributes){
    var model = new Model.call(this, modelName, attributes);

    return model;
}


module.exports = Orz;
