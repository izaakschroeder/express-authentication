
'use strict';

var succeeded = require('mixins/succeeded');

describe('mixins', function() {
	describe('#succeeded', function() {

		beforeEach(function() {
			this.sandbox = sinon.sandbox.create();
		});

		afterEach(function() {
			this.sandbox.restore();
		});

		it('should continue if authenticated is true', function() {
			var next = this.sandbox.stub();
			succeeded()({ authenticated: true }, null, next);
			expect(next).to.be.calledWith(null);
		});

		it('should next route if authenticated is false', function() {
			var next = this.sandbox.stub();
			succeeded()({ authenticated: false }, null, next);
			expect(next).to.be.calledWith('route');
		});

	});
});
