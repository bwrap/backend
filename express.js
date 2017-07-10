'use strict';

var path = require('path');
var express = require('express');

module.exports = () => {
  // Initialize express app
  var app = express();

  // Setting the app router and static folder
  app.use(express.static(path.resolve('./public')));
  // app.set('view engine', 'pug');

  app.get('/api', function (req, res) {
    res.send('Hello World!');
  });

  return app;
}
