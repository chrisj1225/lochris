import passportJwt from 'passport-jwt';
import mongoose from 'mongoose';

import keys from '../config/keys';

const JwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
const User = mongoose.model('User');

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(new JwtStrategy(options, (jwt_payload, done) => {
    User.findById(jwt_payload.id)
      .then(user => {
        if (user) {
          // return the user to the frontend
          return done(null, user);
        }
        // return false since  there is no user
        return done(null, false);
      })
      .catch(err => console.log(err));
  }));
};