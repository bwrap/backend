'use strict';

var path = require('path');
var express = require('express');
var glob = require('glob');

const V1 = '/api/v1';

module.exports = () => {
  // Initialize express app
  var app = express();

  // Setting the app router and static folder
  app.use(express.static(path.resolve('./public')));
  // app.set('view engine', 'pug');

  glob('./api/v1/**/*.js', function (err, files) {
    files.forEach(routePath => {
      const route = require(path.resolve(routePath))(express);
      app.use('/api/v1/', route);
    });
  });

  return app;
}
