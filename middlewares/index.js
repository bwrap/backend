
const passport = require('passport');
const jwt = require('jwt-simple');
require('../config/passport')(passport);

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

exports.ensureEnduserAuthenticated = async function ensureEnduserAuthenticated (req, res, next) {
  try {
    if (!req.headers.authorization) {
      return res.status(403).send('Your request has no authorization header.');
    }

    const token = req.headers.authorization.split(' ')[1];

    var payload = jwt.decode(token, process.env.TOKEN_SECRET || 'secretTokenHere');

    passport.authenticate('jwt', (err, data, info) => {
      console.log('ERROR:', err);
      console.log('DATA:', data);
      console.log('INFO:', info);
      if (payload.exp <= moment().unix() || !payload.exp) {
        var err = new Error();
        err.status = 403;
        err.name = 'InvalidToken';
        throw err;
      }

      next();
    })(req, res, next);
  } catch (e) {
    throw e;
  }
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
  res.send(message);
}
