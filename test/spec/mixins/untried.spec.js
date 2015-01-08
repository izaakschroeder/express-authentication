
'use strict';

var untried = require('mixins/untried');

describe('mixins', function() {
	describe('#untried', function() {
		beforeEach(function() {
			this.sandbox = sinon.sandbox.create();
		});

		afterEach(function() {
			this.sandbox.restore();
		});

		it('should return true if challenge is false', function() {
			var next = this.sandbox.stub();
			untried()({ challenge: false }, null, next);
			expect(next).to.be.calledWith(null);
		});

		it('should return false if challenge is true', function() {
			var next = this.sandbox.stub();
			untried()({ challenge: true }, null, next);
			expect(next).to.be.calledWith('route');
		});
	});
});
