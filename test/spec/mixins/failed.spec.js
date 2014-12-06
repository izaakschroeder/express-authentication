
'use strict';

var failed = require('mixins/failed');
describe('mixins', function() {
	describe('#failed', function() {

		beforeEach(function() {
			this.sandbox = sinon.sandbox.create();
			this.of = this.sandbox.stub().returns({ });
			this.failed = failed.call({ of: this.of });
		});

		afterEach(function() {
			this.sandbox.restore();
		});

		it('should continue if all authenticated is false', function() {
			var next = this.sandbox.stub();
			this.of.returns({
				a: { authenticated: false },
				b: { authenticated: false }
			});
			this.failed(null, null, next);
			expect(next).to.be.calledWith(null);
		});

		it('should next route if any authenticated is true', function() {
			var next = this.sandbox.stub();
			this.of.returns({
				a: { authenticated: false },
				b: { authenticated: true }
			});
			this.failed(null, null, next);
			expect(next).to.be.calledWith('route');
		});

	});
});
