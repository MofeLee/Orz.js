const co = require('co');
// const debug = require('debug')('test:model');
// const squel = require('squel');

var config = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'orz_test'
    },
    pool: {
        min: 0,
        max: 10
    }
    // debug: true
};

describe('Model', function() {

    var orz;
    var model;
    before(function(done) {
        orz = new Orz(config);

        var tableName = 'test_table';

        model = orz.define(tableName, {});

        co(function*() {
            try {
                // 删除以前遗留的测试表
                yield model.knex.schema.dropTableIfExists(tableName);

                // 创建测试表
                yield model.knex.schema
                    .createTableIfNotExists(tableName, function(table) {
                        table.increments();
                        table.string('name');
                        table.timestamps();
                    });

                yield model.knex(tableName)
                    .insert([{
                        name: 'tony'
                    }, {
                        name: 'kitty'
                    }, {
                        name: 'petter'
                    }]);
            } catch (err) {
                throw new Error(err);
            }

            return done();
        });


    });

    describe('Model#findAll', function() {
        it('should 获取到结果', function(done) {
            model.findAll()
                .then(function(data) {
                    // console.log('data: ', data);

                    expect(data.length).to.be.equal(3);

                    expect(data[2]).to.have.property('id', 3);
                    expect(data[2]).to.have.property('name', 'petter');
                    done();
                });
        });
    });
});
