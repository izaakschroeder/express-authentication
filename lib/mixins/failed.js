
'use strict';

/**
* Description goes here.
*
* @returns {Function} Middleware.
*
* @see
*/
module.exports = function failed() {
	return function check(req, res, next) {
		next(!req.authenticated ? null : 'route');
	};
};
