
'use strict';

/**
* Description goes here.
*
* @returns {Function} Middleware.
*
* @see
*/
module.exports = function tried() {
	return function check(req, res, next) {
		next(req.challenge ? null : 'route');
	};
};
