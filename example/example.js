#!/usr/bin/env node

'use strict';

var express = require('express'),
	http = require('http'),
	path = require('path'),
	authenticated = require(path.join(__dirname, '..'));

var app = express();

/**
 * Authentication middleware.
 * @param {Object} req Request.
 * @param {Object} res Response
 * @param {Function} next Next in middleware chain.
 * @returns {void}
 */
function authenticator(req, res, next) {

	// If authorization header is provided then mark that the user
	// has tried authentication
	if (req.headers['authorization']) {
		req.authentication = true;
	}

	// If the authorization header is correct, mark the request as
	// being authenticated and mark the identity of the authenticator
	// as "fancyuser".
	if (req.headers['authorization'] === 'secret') {
		req.authenticated = true;
		req.principal = 'fancyuser';
	}

	// Call the next entry in the middleware chain
	next();
}

// Create middleware sequence
var secret = [ authenticator(), authenticated() ];

// Simple unauthenticated route
app.get('/', function indexRoute(req, res) {
	res.status(200).send({ message: 'hello' });
});

// Secret route
app.get('/secret', secret, function secretRoute(req, res) {
	res.status(200).send({ message: 'secret' });
});

// Start the server
http.createServer(app).listen(process.env.PORT);
