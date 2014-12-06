
'use strict';

var succeeded = require('mixins/succeeded');

describe('mixins', function() {
	describe('#succeeded', function() {

		beforeEach(function() {
			this.sandbox = sinon.sandbox.create();
			this.of = this.sandbox.stub().returns({ });
			this.succeeded = succeeded.call({ of: this.of });
		});

		afterEach(function() {
			this.sandbox.restore();
		});

		it('should continue if any authenticated is true', function() {
			var next = this.sandbox.stub();
			this.of.returns({
				a: { authenticated: false },
				b: { authenticated: true }
			});
			this.succeeded(null, null, next);
			expect(next).to.be.calledWith(null);
		});

		it('should next route if all authenticated is false', function() {
			var next = this.sandbox.stub();
			this.of.returns({
				a: { authenticated: false },
				b: { authenticated: false }
			});
			this.succeeded(null, null, next);
			expect(next).to.be.calledWith('route');
		});

	});
});
