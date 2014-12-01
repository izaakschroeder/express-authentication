
'use strict';

var chai = require('chai');

chai.use(require('sinon-chai'));
chai.use(require('chai-things'));
chai.use(require('supertest-chai').httpAsserts);

global.expect = chai.expect;
