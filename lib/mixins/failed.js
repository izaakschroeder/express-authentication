
'use strict';

var _ = require('lodash');

/**
* Description goes here.
*
* @returns {Function} Middleware.
*
* @see
*/
module.exports = function failed() {
	var self = this;
	return function check(req, res, next) {
		next(!_.some(self.of(req, true), 'authenticated') ? null : 'route');
	};
};
