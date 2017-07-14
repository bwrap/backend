
exports.handler = function handler(req, res, next) {
  console.log('Handler!', req);
  next();
}

exports.logErrors = function logErrors(err, req, res, next) {
  console.error(err.stack);
  next(err);
}

exports.errorHandler = function errorHandler(err, req, res, next) {
  // Default values
  let status = err.status || 500;
  let message = 'Internal server error';

  if (res.headersSent) {
    return next(err);
  }

  res.status(status);
  res.send({ error: message });
}
