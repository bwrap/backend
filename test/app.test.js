
'use strict';

var request = require('supertest');

var server = require('../server');

// Unit test
describe('POST /api/v1/users', function () {
  it ('expects HTTP response 200', function (done) {
    request(server)
      .post('/api/v1/users')
      .expect(200, done);
  });
});
