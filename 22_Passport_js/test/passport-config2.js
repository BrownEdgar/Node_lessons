const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');


passport.serializeUser(function (user, done) {
  console.log(`serializeUser`, user)
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  console.log(`deserializeUser`, user)
  done(null, user);

});

passport.use(new GoogleStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: "http://localhost:3000/auth/google/redirect" //petq 1 hamynkni https://console.developers.google.com/?hl=ru sayti "Authorized redirect URIs"-i het
},
  function (accessToken, refreshToken, profile, done) {
    console.log(`object`, profile)
    return done(null, profile);

  }
));