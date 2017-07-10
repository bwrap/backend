/*
 * Module dependencies
 */
const http = require('http');
const PORT = 3000;

const express = require('./express');

// Init the express application
const app = express();
const server = http.createServer(app);

// Server listen
server.listen(PORT, () => {
  console.log(`Server listen on PORT: ${PORT}`);
});

// Expose app
exports = module.exports = app;
