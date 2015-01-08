
'use strict';

/**
* Description goes here.
*
* @returns {Function} Middleware.
*
* @see
*/
module.exports = function required() {
	return function check(req, res, next) {
		if (req.authenticated) {
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
