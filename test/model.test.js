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

    describe('Model#findAll', function() {
        it('should return a model', function(done){
            model.findAll()
                .then(function(data){
                    console.log(data);
                    done();
                })
        })
    });
})
