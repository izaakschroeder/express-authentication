
'use strict';

var _ = require('lodash'),
	mixins = require('./mixins'),
	contextualize = require('express-context');

/**
 * Create authentication middleware.
 * @param {Object} options Configuration options.
 * @returns {Function} Middleware.
 */
module.exports = _.assign(function authentication(options) {
	options = _.assign({ }, options, {
		context: '__authentication'
	});

	var context = contextualize({
		context: options.context,
		properties: [ 'authentication', 'authenticated', 'challenge' ]
	});

	var wrapped = _.mapValues(mixins, function wrap(mixin) {
		return function wrapper() {
			return this.use(mixin.apply(this, arguments));
		};
	});

	return context.mixin(wrapped);

}, mixins, {
	of: function pick(req) {
		return _.pick(req, 'authentication', 'authenticated', 'challenge');
	}
});
