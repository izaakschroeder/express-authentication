
'use strict';

var _ = require('lodash'),
	contextualize = require('express-context');


module.exports = function authenticator(config) {

	var context = contextualize({
		name: '_authentication',
		properties: [ 'authentication', 'authenticated', 'challenge']
	});

	context.for(req)

	return context;

};
