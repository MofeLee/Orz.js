const co = require('co');
const squel = require('squel');
describe('Model', function() {

    var orz;
    var model;
    before(function(done) {
        orz = new Orz('orz_test', 'root', '', {
            host: 'localhost'
        });

        var tableName = 'test_table';

        model = orz.define(tableName, {});

        co(function*() {
            try {
                // 删除以前遗留的测试表
                yield model.query('drop table if exists ' + tableName);

                // 创建测试表
                yield model.query([
                    'create table ', tableName, '(',
                    '  id     bigint not null auto_increment,',
                    '  name   varchar(50),',
                    '  primary key (id)',
                    ')'
                ].join(''));

                var sql = squel.insert()
                    .into(tableName)
                    .setFieldsRows([
                        {name: 'tony'},
                        {name: 'kitty'},
                        {name: 'petter'}
                    ]).toString();

                console.log(sql);

                yield model.query(sql);
            } catch (err) {
                throw new Error(err);
            }

            return done();
        });


    });

    describe('Model#query', function() {
        context('when SQL语句正确时', function() {
            it('should 获取到结果', function(done) {
                model.query('SELECT 1+1 AS solution')
                    .then(function(data) {
                        expect(data.rows[0].solution)
                            .to.be.equal(2);
                        done();
                    });
            });
        });

        context('when SQL错误时', function() {
            it('should 返回一个err', function(done) {
                model.query('I AM wrong')
                    .catch(function(err) {
                        expect(err).to.not.be.undefined;
                        done();
                    });

            });
        });

    });


    describe('Model#findAll', function() {
        it('should 获取到结果', function(done) {
            model.findAll()
                .then(function(data) {
                    // console.log(data);
                    
                    expect(data.rows.length).to.be.equal(3);
                    expect(data.rows[2]).to.deep.equal({ id: 3, name: 'petter' });
                    done();
                });
        });
    });
});
