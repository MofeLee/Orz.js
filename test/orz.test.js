describe('Orz', function() {

    var orz;
    before(function() {
        orz = new Orz('orz_test', 'root', '', {
            host: 'localhost'
        });

    });

    describe('Orz#define', function() {
        it('should return a model', function(){
            var model = orz.define('test_table', {});

            expect(model.name).to.be.equal('test_table');
            expect(model.attributes).to.deep.equal({});
        });
    });
});
