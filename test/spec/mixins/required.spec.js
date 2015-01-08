
'use strict';

var required = require('mixins/required');

describe('mixins', function() {
	describe('#required', function() {

		beforeEach(function() {
			this.sandbox = sinon.sandbox.create();
		});

		afterEach(function() {
			this.sandbox.restore();
		});

		it('should continue if authenticated is true', function() {
			var next = this.sandbox.stub();
			required()({ authenticated: true }, null, next);
			expect(next).to.be.calledWith(null);
		});

		it('should error if authenticated is false', function() {
			var next = this.sandbox.stub();
			required()({ authenticated: false }, null, next);
			expect(next).to.be.calledWithMatch({ statusCode: 401 });
		});

	});
});
