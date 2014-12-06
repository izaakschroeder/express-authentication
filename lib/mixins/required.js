
'use strict';

var _ = require('lodash');

/**
* Description goes here.
*
* @returns {Function} Middleware.
*
* @see
*/
module.exports = function required() {
	var self = this;
	return function check(req, res, next) {
		if (_.some(self.of(req, true), 'authenticated')) {
			next(null);
		} else {
			next({
				status: 401,
				statusCode: 401,
				error: 'AUTHENTICATION_REQUIRED'
			});
		}
	};
};
