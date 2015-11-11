describe('Model', function() {

    var orz;
    var model;
    before(function() {
        orz = new Orz('orz_test', 'root', '', {
            host: 'localhost'
        });

        var tableName = 'test_table';

        model = orz.define(tableName, {});
    });

    describe('Model#query', function(){
        context('when SQL语句正确时', function(){
            it('should 获取到结果', function(done){
                model.query('SELECT 1+1 AS solution')
                    .then(function(data){
                        expect(data.rows[0].solution)
                            .to.be.equal(2);
                        done();
                    });
            });
        });

        context('when SQL错误时', function(){
            it('should 返回一个err', function(done){
                model.query('I AM wrong')
                    .catch(function(err){
                        expect(err).to.be.defined;
                        done();
                    });

            });
        });

    });

    describe('Model#findAll', function() {
        it('should 获取到结果', function(done){
            model.findAll()
                .then(function(data){
                    expect(data.rows).is.defined;
                    done();
                });
        });
    });
});
