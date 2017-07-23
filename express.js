'use strict';

var path = require('path');
var util = require('util');
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors');
var glob = require('glob');
var morgan = require('morgan');

const {
  handler,
  logErrors,
  errorHandler,
} = require('./middlewares');

const V1 = '/api/v1';

module.exports = () => {
  // Initialize express app
  var app = express();

  app.use(cors());
  // Middlewares - process between views and controller
  app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));
  app.use(bodyParser.json());
  app.use(methodOverride());

  // Logger
  app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
  app.use(morgan(function (tokens, req, res) {
    return util.inspect({ params: req.params, body: req.body }, false, null);
  }));

  app.use(function (req, res, next) {
    var oldSend = res.send;

    res.send = function () {
      // Initial variables
      var data    = arguments[0][0];
      var message = arguments[0][1];
      var status  = arguments[0][2] || typeof arguments[0][2] === 'undefined' || false;

      if (typeof data === 'undefined') throw new Error('Data response is required.');

      if (typeof arguments[0] === 'object') {
        var handleResult = { status, message, data };
        arguments[0] = handleResult;
      }

      oldSend.apply(res, arguments);
    }
    next();
  });

  // Setting the app router and static folder
  app.use(express.static(path.resolve('./public')));

  glob(`.${V1}/**/*.js`, function (err, files) {
    files.forEach((routePath) => {
      const route = require(path.resolve(routePath));
      const router = require('./config/router')(express, route);
      app.use(`${V1}/`, router);
    });
  });

  app.use(handler);
  app.use(logErrors);
  app.use(errorHandler);

  return app;
}
