
'use strict';

var _ = require('lodash'),
	failed = require('./failed');

/**
* Description goes here.
*
* @param {Function} auth
* @returns {Function}
*
* @see
*/
module.exports = function required(auth) {

	function fail(req, res, next) {
		return next({
			status: 401,
			statusCode: 401,
			data: req.authentication
		});
	}

	router.use(failed(auth), fail);

	return router;
};
