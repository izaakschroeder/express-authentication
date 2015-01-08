#!/usr/bin/env node

'use strict';

var express = require('express'),
	path = require('path'),
	authentication = require(path.join(__dirname, '..'));

var app = express(),
	auth = authentication();

auth = auth.mixin({
	query: function query(param) {
		return this.use(function middleware(req, res, next) {
			req.challenge = req.query[param];
			next();
		});
	},
	check: function check(value) {
		return this.use(function middleware(req, res, next) {
			req.authenticated = req.challenge === value;
			console.log('CHECKED OUT BRO!');
			next();
		});
	}
});


var auth1 = auth.for('auth1').query('auth_code').check('secret'),
	auth2 = auth.for('auth2').query('userid').check('bananas');

// use similar chaining approach for and/or:
// and(auth1, auth2) = parallel(auth1, auth2) + mixin(shared methods)
// and(auth1, auth2).method() -> parallel(auth1.method(), auth2.method()) ??
// not quite
// and(a,b).c() -> (a,b) _MUST_ succeed, (a,c),(b,c) _MUST_ succeed
//  or(a,b).c() -> (a,b) _MUST_ succeed, (a,c),(b,c) EITHER

app.get('/a', auth1.required(), function a(req, res) {
	res.status(200).send('Hello world.');
});

app.get('/b', auth2.required(), function b(req, res) {
	res.status(200).send('Hello world.');
});

/*
app.get('/aandb', both(auth1, auth2).required(), function aandb(req, res) {
	res.status(200).send('Hello world.');
});

app.get('/aorb', either(auth1, auth2).required(), function aorb(req, res) {
	res.status(200).send('Hello world.');
});
*/

app.listen(process.env.PORT);
