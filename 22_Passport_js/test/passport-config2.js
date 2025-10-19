const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');

passport.serializeUser((user, done) => {
  console.log('serializeUser', user);
  done(null, user);
});

passport.deserializeUser((user, done) => {
  console.log('deserializeUser', user);
  done(null, user);
});

passport.use(
  new GoogleStrategy(
    {
      clientID: '975129130799-h9hgh2j4vgbli5l80jibindiqv0irbep.apps.googleusercontent.com',
      clientSecret: 'KQXmpcZzgWuOgjtJe0dQC-z8',
      callbackURL: 'http://localhost:3000/auth/google/redirect',
    },
    (accessToken, refreshToken, profile, done) => {
      console.log('object', profile);
      return done(null, profile);
    }
  )
);
