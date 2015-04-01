
'use strict';

/**
* Description goes here.
*
* @returns {Function} Middleware.
*
* @see
*/
module.exports = function required() {
	return function check(error, req, res, next) {
		if (req.authenticated) {
			next(null);
		} else {
			next(error || {
				status: 401,
				statusCode: 401,
				error: 'AUTHENTICATION_REQUIRED'
			});
		}
	};
};
