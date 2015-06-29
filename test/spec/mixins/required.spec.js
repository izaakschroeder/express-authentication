
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

		it('should accept an error object', function() {
			var next = this.sandbox.stub();
			required({ statusCode: 403 })({ authenticated: false }, null, next);
			expect(next).to.be.calledWithMatch({ statusCode: 403 });
		});

		it('should use the result of an error function', function() {
			var next = this.sandbox.stub();
			required(function() {
				return { statusCode: 403 };
			})({ authenticated: false }, null, next);
			expect(next).to.be.calledWithMatch({ statusCode: 403 });
		});

		it('should skip error function when authenticated', function() {
			var next = this.sandbox.stub();
			required(function() {
				return { statusCode: 403 };
			})({ authenticated: true }, null, next);
			expect(next).to.be.calledWith(null);
		});

		it('should fail on invalid arguments', function() {
			expect(function() {
				required('foo');
			}).to.throw(TypeError);
		});

	});
});
