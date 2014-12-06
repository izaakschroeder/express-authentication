# express-authentication

Unopinionated authentication for [express]; an alternative to [passport].

![build status](http://img.shields.io/travis/izaakschroeder/express-authentication.svg?style=flat&branch=master)
![coverage](http://img.shields.io/coveralls/izaakschroeder/express-authentication.svg?style=flat&branch=master)
![license](http://img.shields.io/npm/l/express-authentication.svg?style=flat)
![version](http://img.shields.io/npm/v/express-authentication.svg?style=flat)
![downloads](http://img.shields.io/npm/dm/express-authentication.svg?style=flat)

## Usage

```javascript
var express = require('express'),
	Authentication = require('express-authentication'),
	app = express();

var authentication = Authentication();

// Authentication is just middleware! The middleware must just obey a few rules;
// no need to include another library.
var api = function(req, res, next) {

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
};

var session = function(req, res, next) {
	// ...
};

var facebook = function(req, res, next) {
	// ...
};

// To use all the fancy sugar methods we have to load the authentication
// middleware as well. It is entirely possible to use this framework without it
// but they provide a nice convenience.
app.use(authentication);

// Allow session/api authentication to occur anywhere; that is to say someone
// can provide credentials for either kind of authentication and they will be
// accepted.
app.use(authentication.for(session));
app.use(authentication.for(api));

// Only allow facebook authentication to occur at the /facebook location.
app.use('/facebook', facebook);

// Ensure this route is only authenticated via session
app.get('/session', authentication.for(session).required());

// Allow anything to authenticate against this route
app.get('/any', authentication.required());

// Allow either API or session to authenticate against this route
app.get('/api-or-session', authentication.for([api, session]).required());

// Invoke specific middleware when authentication either succeeds or fails
// which is much more powerful than passports `redirect` ability.
app.get('/handlers', authentication.for(api).succeeded(), redirect())
app.get('/handlers', authentication.for(session).succeeded(), redirect())
app.get('/handlers', authentication.failed(), redirect())

// Get authentication data from middleware itself
app.get('/any', function(req, res) {

	// Get anything that was set
	var auth = authentication.for(api).of(req);

	if (auth.succeeded) {
		// Use auth.data
	}
});

```

## Authentication Middleware

 * [Facebook](http://www.github.com/)
 * [GitHub](http://www.github.com/)
 * [Google](http://www.github.com/)
 * [OAuth2](http://www.github.com/)

## Sugar

 * Actions
  * required - fail the route unless auth succeeded
  * succeeded - continue middleware chain only if auth succeeded
  * failed - continue middleware chain only if auth failed
  * tried - continue middleware chain only if auth tried
  * untried - continue middleware chain only if auth untried
 * Filters
  * by - apply only to the given authentication middleware

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
		"express-authentication": "^1.0.0"
	}
}
```

## Differences to passport

Passport is _very_ opinionated.

It's an authentication framework. We don't touch your sessions. passport (although possible to use without) pretty much assumes you're going to be using session-based authentication.

```javascript
this.use(new SessionStrategy());
```

Authentication is tightly coupled in passport. It is not possible to delegate when authentication failure should occur. passport strategies must also always inherit from a base `Strategy` class; they are not middleware themselves.



[express]: http://expressjs.com/
[passport]: https://github.com/jaredhanson/passport
