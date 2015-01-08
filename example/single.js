#!/usr/bin/env node

'use strict';

var express = require('express'),
	path = require('path'),
	authentication = require(path.join(__dirname, '..'));

var app = express();

app.use(function middleware(req, res, next) {
	req.challenge = req.query.auth_code;
	req.authenticated = req.challenge === 'secret';
	next();
});

app.get('/', authentication.required(), function index(req, res) {
	res.status(200).send('Hello world.');
});

app.listen(process.env.PORT);
