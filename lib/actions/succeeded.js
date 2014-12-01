
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
module.exports = function succeeded(auth) {
	return function (req, res, next) {
		next(_.some(auth(req), 'authenticated') ? null : 'route');
	};
};
