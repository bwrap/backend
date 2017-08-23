'use strict';

var path = require('path');
var util = require('util');
var express = require('express');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var cors = require('cors');
var glob = require('glob');
var morgan = require('morgan');
const passport = require('passport');

const {
  handler,
  logErrors,
  errorHandler,
  ensureEnduserAuthenticated,
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

  app.use(passport.initialize());

  app.use(function (req, res, next) {
    var oldSend = res.send;
    var flag = true;

    res.send = function () {
      // Initial variables
      var data, message = '', status =  true;

      if (typeof arguments[0] === 'undefined') throw new Error('Response can not be empty.');

      if (arguments[0].constructor === Object) {
        data = arguments[0];
      } else if (arguments[0].constructor === String) {
        message = arguments[0];
        status = false;
      } else if (typeof arguments[0][0] === 'object') {
        data    = arguments[0][0] || {};
        message = arguments[0][1] || '';
        status  = !!arguments[0][2] || typeof arguments[0][2] === 'undefined' || false;
      } else {
        message = arguments[0][0] || '';
        status  = !!arguments[0][1] || typeof arguments[0][1] === 'undefined' || false;
      }

      if (typeof arguments[0] === 'object' || flag) {
        var handleResult = { status, message, data };
        arguments[0] = handleResult;
        flag = false;
      }

      oldSend.apply(res, arguments);
    }
    next();
  });

  // Setting the app router and static folder
  app.use(express.static(path.resolve('./public')));

  glob(`.${V1}/public/**/*.js`, function (err, files) {
    files.forEach((routePath) => {
      const route = require(path.resolve(routePath));
      const router = require('./config/router')(express, route);
      app.use(`${V1}/`, router);
    });
  });

  glob(`.${V1}/admin/**/*.js`, function (err, files) {
    files.forEach((routePath) => {
      const route = require(path.resolve(routePath));
      const router = require('./config/router')(express, route);
      app.use(`${V1}/admin`, ensureEnduserAuthenticated, router);
    });
  });

  app.use(handler);
  app.use(logErrors);
  app.use(errorHandler);

  return app;
}
