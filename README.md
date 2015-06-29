# express-authentication

Unopinionated authentication for [express]; an alternative to [passport].

![build status](http://img.shields.io/travis/izaakschroeder/express-authentication.svg?style=flat&branch=master)
![coverage](http://img.shields.io/coveralls/izaakschroeder/express-authentication.svg?style=flat&branch=master)
![license](http://img.shields.io/npm/l/express-authentication.svg?style=flat)
![version](http://img.shields.io/npm/v/express-authentication.svg?style=flat)
![downloads](http://img.shields.io/npm/dm/express-authentication.svg?style=flat)

| Type      | URL                                                              |
|-----------|------------------------------------------------------------------|
|HTTP Basic |https://github.com/izaakschroeder/express-authentication-basic    |
|HTTP Bearer|https://github.com/izaakschroeder/express-authentication-bearer   |
|Facebook   |http://www.github.com/izaakschroeder/express-authentication-oauth2|
|GitHub     |http://www.github.com/izaakschroeder/express-authentication-oauth2|
|Google     |http://www.github.com/izaakschroeder/express-authentication-oauth2|
|OAuth2     |http://www.github.com/izaakschroeder/express-authentication-oauth2|

## Usage

If your needs are simple and you only have one kind of authentication you can use `express-authentication` mixins trivially out of the box.

```javascript
var express = require('express'),
	authentication = require('express-authentication'),
	app = express();

app.use(function myauth(req, res, next) {
	// provide the data that was used to authenticate the request; if this is
	// not set then no attempt to authenticate is registered.
	req.challenge = req.get('Authorization');

	req.authenticated = req.authentication === 'secret';

	// provide the result of the authentication; generally some kind of user
	// object on success and some kind of error as to why authentication failed
	// otherwise.
	if (req.authenticated) {
		req.authentication = { user: 'bob' };
	} else {
		req.authentication = { error: 'INVALID_API_KEY' };
	}

	// That's it! You're done!
	next();
});

app.get('/secret', authentication.required(), function(req, res) {
	res.status(200).send('Hello!');
});
```

If you want to use more than one authentication middleware then use the magic of contextualization.

```javascript
var express = require('express'),
	authentication = require('express-authentication'),
	app = express();

var auth = authentication();

// Authentication is just middleware! The middleware must just obey a few rules;
// no need to include another library.
var api = auth.for('api').use(function(req, res, next) {

	// provide the data that was used to authenticate the request; if this is
	// not set then no attempt to authenticate is registered.
	req.challenge = req.get('Authorization');

	req.authenticated = req.authentication === 'secret';

	// provide the result of the authentication; generally some kind of user
	// object on success and some kind of error as to why authentication failed
	// otherwise.
	if (req.authenticated) {
		req.authentication = { user: 'bob' };
	} else {
		req.authentication = { error: 'INVALID_API_KEY' };
	}

	// That's it! You're done!
	next();
});

var session = auth.for('session').use(function(req, res, next) {
	// ...
});

var facebook = auth.for('facebook').use(function(req, res, next) {
	// ...
});

// Allow session/api authentication to occur anywhere; that is to say someone
// can provide credentials for either kind of authentication and they will be
// accepted.
app.use(session);
app.use(api);



// Only allow facebook authentication to occur at the /facebook location.
app.use('/facebook', facebook);

// Ensure this route is only authenticated via session
app.get('/session', session.required());

// Allow anything to authenticate against this route
app.get('/any', auth.required());

// Invoke specific middleware when authentication either succeeds or fails
// which is much more powerful than passports `redirect` ability.
app.get('/handlers', api.succeeded(), redirect());
app.get('/handlers', session.succeeded(), redirect());
app.get('/handlers', auth.failed(), redirect());

// Get authentication data from middleware itself
app.get('/any', function(req, res) {

	// Get anything that was set
	var result = api.of(req);

	if (result.authenticated) {
		// Use auth.data
	}
});

```

## Mixins

 * required - fail the route unless auth succeeded
 * succeeded - continue middleware chain only if auth succeeded
 * failed - continue middleware chain only if auth failed
 * tried - continue middleware chain only if auth tried
 * untried - continue middleware chain only if auth untried

## Roll Your Own Middleware

```javascript
// Authentication is just middleware! The middleware must just obey a few rules;
// no need to include another library.
function api(req, res, next) {

	// provide the data that was used to authenticate the request; if this is
	// not set then no attempt to authenticate is registered. if no data is
	// provided but you still wish to register an authentication attempt, set
	// this to true.
	req.challenge = req.get('Authorization');

	// provide the result of the authentication; true if it succeeded, false
	// if it did not.
	req.authenticated = req.authentication === 'secret';

	// provide the metadata of the authentication; generally some kind of user
	// object on success and some kind of error as to why authentication failed
	// otherwise.
	if (req.authenticated) {
		req.authentication = { user: 'bob' };
	} else {
		req.authentication = { error: 'INVALID_API_KEY' };
	}

	// That's it! You're done!
	next();
};

// Let everyone use it.
module.exports = api;

```

Make sure you include us in your keywords and mark which version of the API you are compatible with in your `package.json`!

```json
{
	"keywords": [ "express-authentication" ],
	"peerDependencies": {
		"express-authentication": "^0.3.0"
	}
}
```

## Differences to passport

Passport is _very_ opinionated. Passport has more strategies available.

### Passport loves sessions

`express-authentication` an authentication framework; we don't touch your sessions. passport (although possible to use without) pretty much assumes you're going to be using session-based authentication.

### Passport strategies must extend base class

Passport strategies must always inherit from a base `Strategy` class; they are not middleware themselves.

`passport` strategy:

```javascript
// passport strategy
function SessionStrategy() {
	Strategy.call(this);
	this.name = 'session';
}
util.inherits(SessionStrategy, Strategy);

SessionStrategy.prototype.authenticate = function(req, options) {
	// ...
}

module.exports = SessionStrategy;
```

`express-authentication` middleware:

```javascript
module.exports = function(req, res, next) {
	// ...
}
```

### Passport delegation not possible

Authentication and actions from authentication results are tightly coupled in passport. It is not possible to delegate when authentication failure should occur.

`passport` delegation:

```javascript
// passport binds actions
app.get('/login', passport.authenticate('provider', {
	successRedirect: '/',
	failureRedirect: '/login'
}));
```

`express-authentication` delegation:

```javascript
// express-authentication lets you do what you want
app.get('/login', provider.succeeded(), redirect('/'))
app.get('/login', provider.failed(), redirect('/login'))
```

[express]: http://expressjs.com/
[passport]: https://github.com/jaredhanson/passport
