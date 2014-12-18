
'use strict';

var _ = require('lodash'),
	mixins = require('./mixins'),
	contextualize = require('express-context');

/**
 * Create authentication middleware.
 * @param {Object} options Configuration options.
 * @returns {Function} Middleware.
 */
module.exports = function authentication(options) {
	options = _.assign({ }, options, {
		context: '__authentication'
	});

	return contextualize({
		context: options.context,
		properties: [ 'authentication', 'authenticated', 'challenge' ]
	}).mixin(mixins);

};
