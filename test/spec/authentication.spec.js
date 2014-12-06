
'use strict';

var authentication = require('authentication');

describe('#authenticator', function() {
	it('should return new middleware', function() {
		var auth = authentication();
		expect(auth).to.not.be.null;
	});
});
