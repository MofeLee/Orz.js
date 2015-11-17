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
    var tableName = 'test_table';

    beforeEach(function(done) {
        orz = new Orz(config);
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

                // 插入测试字段
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

    afterEach(function(done) {
        co(function*() {
            try {
                yield model.knex.schema.dropTableIfExists(tableName);
            } catch (err) {
                throw new Error(err);
            }

            return done();
        });
    });

    describe('Model#query', function() {
        it('should get correct results', function(done) {
            model.query('SELECT 1+1 AS solution')
                .then(function(data) {

                    expect(data[0][0].solution).to.be.equal(2);
                    done();
                });
        });
    });

    describe('Model#findAll', function() {
        it('should get correct results', function(done) {
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

    describe('Model#findById', function() {
        it('should get correct results', function(done) {
            model.findById(2)
                .then(function(data) {
                    // console.log(data);
                    expect(data.length).to.be.equal(1);
                    expect(data[0].id).to.be.equal(2);
                    expect(data[0].name).to.be.equal('kitty');
                    done();
                });
        });

    });

    describe('Model#create', function() {
        it('should create a row', function(done) {
            co(function*() {
                var beforeData = yield model.findAll();
                var obj = [{
                    name: 'cody'
                }];

                var returnObj = yield model.create(obj);
                var afterData = yield model.findAll();

                expect(beforeData.length).to.be.equal(3);
                expect(returnObj).to.deep.equal([4]);
                expect(afterData.length).to.be.equal(4);

            }).then(function() {
                done();
            }).catch(function(err){
                done(new Error(err));
            });
        });

    });

    describe('Model#count', function() {
        it('should get correct results', function(done) {
            model.count()
                .then(function(data) {
                    expect(data).to.be.equal(3);
                    done();
                });
        });

    });
});
