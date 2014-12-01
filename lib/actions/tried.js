
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
module.exports = function tried(auth) {
	return function(req, res, next) {
		next(_.some(auth(req), 'challenge') ? null : 'route');
	};
};
