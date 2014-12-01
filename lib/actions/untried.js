
'use strict';

var _ = require('lodash');

/**
 * Description goes here.
 *
 * @param {Function} auth
 * @returns {Function}
 *
 * @see
 */
module.exports = function untried(auth) {
	return function(req, res, next) {
		next(!_.every(auth(req), 'challenge') ? null : 'route');
	};
};
