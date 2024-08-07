const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./keys');
const User = require('../models/user-model');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy({
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret,
    callbackURL: 'http://localhost:3000/auth/google/callback'
  }, (accessToken, refreshToken, profile, done) => {
    console.log('profile:', profile)
    // check if user already exists in our own db
    User.findOne({ googleId: profile.id }).then((currentUser) => {
      if (currentUser) {
        // already have this user
        console.log('user is: ', currentUser);
        done(null, currentUser);
      } else {
        // if not, create user in our db
        new User({
          googleId: profile.id,
          username: profile.displayName,
          thumbnail: profile.photos[0].value
        }).save().then((newUser) => {
          console.log('created new user: ', newUser);
          done(null, newUser);
        });
      }
    });
  })
);




// var GoogleStrategy = require('passport-google-oauth20').Strategy;

// passport.use(new GoogleStrategy({
//   clientID: keys.google.clientID,
//   clientSecret: keys.google.clientSecret,
//   callbackURL: 'http://localhost:3000/auth/google/callback'
// },
//   function (accessToken, refreshToken, profile, cb) {
//     console.log(profile)
//     cb(null, profile);

//   }
// ));