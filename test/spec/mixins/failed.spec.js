
'use strict';

var failed = require('mixins/failed');
describe('mixins', function() {
	describe('#failed', function() {

		beforeEach(function() {
			this.sandbox = sinon.sandbox.create();
		});

		afterEach(function() {
			this.sandbox.restore();
		});

		it('should continue if authenticated is false', function() {
			var next = this.sandbox.stub();
			failed()({ authenticated: false }, null, next);
			expect(next).to.be.calledWith(null);
		});

		it('should next route if authenticated is true', function() {
			var next = this.sandbox.stub();
			failed()({ authenticated: true }, null, next);
			expect(next).to.be.calledWith('route');
		});

	});
});
