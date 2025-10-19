const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: '',
      clientSecret: '',
      callbackURL: '',
    },

    (accessToken, refreshToken, profile, cb) => {
      console.log(profile);
      return cb(null, profile);
    }
  )
);
