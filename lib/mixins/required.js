
'use strict';

var _ = require('lodash');

/**
* Description goes here.
* @param {Object|Function} error Error to pass to `next` when unauthenticated.
* @returns {Function} Middleware.
*/
module.exports = function required(error) {
	if (!(error)) {
		error = {
			status: 401,
			statusCode: 401,
			error: 'AUTHENTICATION_REQUIRED'
		};
	}
	if (_.isFunction(error)) {
		return function check(req, res, next) {
			if (req.authenticated) {
				next(null);
			} else {
				next(error(req, res));
			}
		};
	} else if (_.isObject(error)) {
		return function check(req, res, next) {
			if (req.authenticated) {
				next(null);
			} else {
				next(error);
			}
		};
	} else {
		throw new TypeError();
	}
};
