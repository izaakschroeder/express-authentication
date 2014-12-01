
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
module.exports = function(auth) {
	return function failed(req, res, next) {
		next(!_.every(auth(req), 'authenticated') ? null : 'route');
	};
};
