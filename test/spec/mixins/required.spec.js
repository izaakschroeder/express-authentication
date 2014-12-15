
'use strict';

var required = require('mixins/required');

describe('mixins', function() {
	describe('#required', function() {

		beforeEach(function() {
			this.sandbox = sinon.sandbox.create();
			this.of = this.sandbox.stub().returns({ });
			this.required = required.call({
				of: this.of,
				chain: function(fn) {
					return fn;
				}
			});
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
			this.required(null, null, next);
			expect(next).to.be.calledWith(null);
		});

		it('should error if all authenticated is false', function() {
			var next = this.sandbox.stub();
			this.of.returns({
				a: { authenticated: false },
				b: { authenticated: false }
			});
			this.required(null, null, next);
			expect(next).to.be.calledWithMatch({ statusCode: 401 });
		});

	});
});
