'use strict';

var path = require('path');
var util = require('util');
var express = require('express');
var glob = require('glob');
var morgan = require('morgan');

const V1 = '/api/v1';

module.exports = () => {
  // Initialize express app
  var app = express();

  // Logger
  app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
  app.use(morgan(function (tokens, req, res) {
    return util.inspect({ params: req.params, body: req.body }, false, null);
  }));

  // Setting the app router and static folder
  app.use(express.static(path.resolve('./public')));

  glob(`.${V1}/**/*.js`, function (err, files) {
    files.forEach((routePath) => {
      const route = require(path.resolve(routePath));
      const router = require('./config/router')(express, route);
      app.use(`${V1}/`, router);
    });
  });

  return app;
}
