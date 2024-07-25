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
  clientID: "144505819167-ej0d7kbvrvj5hnnqv993k33qt22m4qga.apps.googleusercontent.com",
  clientSecret: "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",
  callbackURL: "http://localhost:3000/auth/google/redirect" //petq 1 hamynkni https://console.developers.google.com/?hl=ru sayti "Authorized redirect URIs"-i het
},
  function (accessToken, refreshToken, profile, done) {
    console.log(`object`, profile)
    return done(null, profile);

  }
));