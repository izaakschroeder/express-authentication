
'use strict';

var tried = require('mixins/tried');

describe('mixins', function() {
	describe('#tried', function() {
		beforeEach(function() {
			this.sandbox = sinon.sandbox.create();
			this.of = this.sandbox.stub().returns({ });
			this.tried = tried.call({ of: this.of });
		});

		afterEach(function() {
			this.sandbox.restore();
		});

		it('should return true if any challenge is true', function() {
			var next = this.sandbox.stub();
			this.of.returns({
				a: { challenge: false },
				b: { challenge: true }
			});
			this.tried(null, null, next);
			expect(next).to.be.calledWith(null);
		});

		it('should return false if all challenge is false', function() {
			var next = this.sandbox.stub();
			this.of.returns({
				a: { challenge: false },
				b: { challenge: false }
			});
			this.tried(null, null, next);
			expect(next).to.be.calledWith('route');
		});
	});
});
