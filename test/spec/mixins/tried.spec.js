
'use strict';

var tried = require('mixins/tried');

describe('mixins', function() {
	describe('#tried', function() {
		beforeEach(function() {
			this.sandbox = sinon.sandbox.create();
		});

		afterEach(function() {
			this.sandbox.restore();
		});

		it('should return true if challenge is true', function() {
			var next = this.sandbox.stub();
			tried()({ challenge: true }, null, next);
			expect(next).to.be.calledWith(null);
		});

		it('should return false if challenge is false', function() {
			var next = this.sandbox.stub();
			tried()({ challenge: false }, null, next);
			expect(next).to.be.calledWith('route');
		});
	});
});
