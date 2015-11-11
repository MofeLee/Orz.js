describe('Orz', function() {

    var orz;
    before(function() {
        orz = new Orz('orz_test', 'root', '', {
            host: 'localhost'
        });

    });

    describe('Orz#query', function() {

        it('should 正常返回查询结果', function(done) {
            sql = 'select 1+1 as solution';
            orz.query(sql)
                .then(function(data) {
                    expect(data.rows[0].solution).to.be.equal(2);
                    done();
                })
        })

    });

    describe('Orz#define', function() {
        it('should return a model', function(){
            var model = orz.define('test_table', {});

            expect(model.name).to.be.equal('test_table');
            expect(model.attributes).to.deep.equal({});
        })
    });
})
