
'use strict';

var express = require('express'),
	request = require('supertest');

function success(req, res) {
	res.status(200).send({ message: 'success' });
}



describe('#authenticator', function() {
	beforeEach(function() {

		function authenticator(req, res, next) {
			next();
		}

		this.app = express();
		this.request = request(this.app);
		this.app.get('/', authenticator(), success);
	});

	it('should return HTTP 401', function(done) {
		this.request.get('/').expect(function(res) {
			expect(res).to.have.status(401);
		}).end(done);
	});

	it('should return HTTP 200', function(done) {
		this.request.get('/').expect(function(res) {
			expect(res).to.have.status(200);
		}).end(done);
	});

	it('should HTTP 401 when authentication is required', function(done) {
		this.request.get('/').expect(function(res) {
			expect(res).to.have.status(401);
		}).end(done);
	});

	it('should HTTP 200 when authentication is not required', function(done) {
		this.request.get('/').expect(function(res) {
			expect(res).to.have.status(200);
		}).end(done);
	});

});
