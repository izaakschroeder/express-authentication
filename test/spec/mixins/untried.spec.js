
'use strict';

var untried = require('mixins/untried');

describe('mixins', function() {
	describe('#untried', function() {
		beforeEach(function() {
			this.sandbox = sinon.sandbox.create();
			this.of = this.sandbox.stub().returns({ });
			this.untried = untried.call({
				of: this.of,
				chain: function(fn) {
					return fn;
				}
			});
		});

		afterEach(function() {
			this.sandbox.restore();
		});

		it('should return true if all challenge is false', function() {
			var next = this.sandbox.stub();
			this.of.returns({
				a: { challenge: false },
				b: { challenge: false }
			});
			this.untried(null, null, next);
			expect(next).to.be.calledWith(null);
		});

		it('should return false if any challenge is true', function() {
			var next = this.sandbox.stub();
			this.of.returns({
				a: { challenge: false },
				b: { challenge: true }
			});
			this.untried(null, null, next);
			expect(next).to.be.calledWith('route');
		});
	});
});
