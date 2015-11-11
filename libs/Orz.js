const mysql = require('mysql');
const thunkify = require('thunkify');
const _ = require('lodash');

/**
 * 负责连接数据库,调度之类的
 */
class Orz {
    constructor(cfg) {
        this.config = cfg;

        this.pool = this.mysqlPool;
        this.query = thunkify(this.pool.query).bind(this.pool);
    }

    static getMysqlPool(cfg) {
        const pool = mysql.createPool({
            host: config.host || 'localhost',
            user: config.username || 'root',
            password: config.password || '',
            database: config.database || ''
        });

        return pool;
    }

}

module.exports = Orz;
