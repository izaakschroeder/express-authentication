#!/usr/bin/env node

'use strict';

var express = require('express'),
	path = require('path'),
	authentication = require(path.join(__dirname, '..'));

var app = express();

/**
 * Authentication middleware.
 * @param {Object} req Request.
 * @param {Object} res Response
 * @param {Function} next Next in middleware chain.
 * @returns {void}
 */
function secret(req, res, next) {

	// If authorization header is provided then mark that the user
	// has tried authentication
	req.challenge = req.headers['authorization'];


	// If the authorization header is correct, mark the request as
	// being authenticated and mark the identity of the authenticator
	// as "fancyuser".
	if (req.headers['authorization'] === 'secret') {
		req.authenticated = true;
		req.authentication = 'fancyuser';
	} else {
		req.authenticated = false;
	}

	// Call the next entry in the middleware chain
	next();
}

var auth = authentication().for('secret').use(secret);

// Simple unauthenticated route
app.get('/', function indexRoute(req, res) {
	res.status(200).send({ message: 'hello' });
});

// Secret route
app.get('/secret', auth.required(), function secretRoute(req, res) {
	res.status(200).send({ message: 'secret' });
});

app.get('/other', auth.succeeded(), function other(req, res) {
	//var data = auth.for(secret).of(req);
	res.status(200).send({ message: 'hello' });
});

app.get('/other', auth.failed(), function other2(req, res) {
	res.status(400).send({ message: 'auth_fail_lelelel' });
});

// Start the server
app.listen(process.env.PORT || 5553);
