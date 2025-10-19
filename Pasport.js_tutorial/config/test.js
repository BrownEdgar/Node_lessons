const passport = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');

const User = require('../models/User');

const keys = require('./keys');

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.google.clientId,
      clientSecret: keys.google.clientSecret,
      callbackURL: 'http://www.example.com/auth/google/callback',
    },
    (accessToken, refreshToken, profile, cb) => {
      User.findOrCreate({ googleId: profile.id }, (err, user) => cb(err, user));
    }
  )
);
