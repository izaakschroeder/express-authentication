
'use strict';

var express = require('express'),
	request = require('supertest'),
	authentication = require('authentication');

describe('#authenticator', function() {
	it('should return new middleware', function() {
		var auth = authentication();
		expect(auth).to.not.be.null;
	});

	describe('with context', function() {

		beforeEach(function() {
			var app = this.app = express(),
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
						next();
					});
				}
			});


			var auth1 = auth.for('auth1').query('code').check('secret');

			app.get('/', auth1.required(), function a(req, res) {
				res.status(200).send('Hello world.');
			});
		});

		it('should work when authentication succeeds', function(done) {
			request(this.app)
				.get('/')
				.query({ code: 'secret' })
				.expect(function(res) {
					expect(res.statusCode).to.equal(200);
				})
				.end(done);
		});

		it('should work when authentication fails', function(done) {
			request(this.app)
				.get('/')
				.query({ code: 'fail' })
				.expect(function(res) {
					expect(res.statusCode).to.equal(401);
				})
				.end(done);
		});
	});

	describe('without context', function() {

		function query(param) {
			return function middleware(req, res, next) {
				req.challenge = req.query[param];
				next();
			};
		}

		function check(value) {
			return function middleware(req, res, next) {
				req.authenticated = req.challenge === value;
				next();
			};
		}

		beforeEach(function() {
			var app = this.app = express();

			app.get('/',
				query('code'),
				check('secret'),
				authentication.required(),
				function a(req, res) {
					res.status(200).send('Hello world.');
				}
			);
		});

		it('should work when authentication succeeds', function(done) {
			request(this.app)
				.get('/')
				.query({ code: 'secret' })
				.expect(function(res) {
					expect(res.statusCode).to.equal(200);
				})
				.end(done);
		});

		it('should work when authentication fails', function(done) {
			request(this.app)
				.get('/')
				.query({ code: 'fail' })
				.expect(function(res) {
					expect(res.statusCode).to.equal(401);
				})
				.end(done);
		});

		it('should extract useful info', function(done) {
			this.app.get('/test',
				query('code'),
				check('secret'),
				authentication.required(),
				function a(req, res) {
					expect(authentication.of(res)).to.deep.equal({
						challenge: 'secret'
					});
					res.status(200).send('Hello world.');
				}
			);
			request(this.app)
				.get('/test')
				.query({ code: 'secret' })
				.end(done);
		});
	});
});
