
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

	var context = contextualize({
		name: options.name,
		properties: [ 'authentication', 'authenticated', 'challenge' ]
	});

	return _.assign(context, mixins);
};
