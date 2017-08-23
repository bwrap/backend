const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../api/models/users');

module.exports = async function (passport) {
  const opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('Bearer');
  opts.secretOrKey = process.env.TOKEN_SECRET || 'secretTokenHere';

  passport.use(new JwtStrategy(opts, function (jwt_payload, done) { // eslint-disable-line
    User.find({ id: jwt_payload.id }, function (err, user) {
      console.log('USER:', user);
      if (err) return done(err, false);
      return done(null, user);
    });
  }));
};
