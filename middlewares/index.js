
function pagination (params) {
  var limit   = params.limit  || 10;
  var offset  = params.offset || 0;

  return { limit, offset };
}

exports.handler = function handler(req, res, next) {
  req.pagination = pagination(req.body);
  req.search = req.body.search || '';
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
