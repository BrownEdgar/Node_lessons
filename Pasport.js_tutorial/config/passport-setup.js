const passport = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');

const User = require('../models/User');

const keys = require('./keys');

// Serialize user for session
passport.serializeUser((user, done) => {
  console.log('Serializing user:', user);

  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err, null);
    });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.google.clientId,
      clientSecret: keys.google.clientSecret,
      callbackURL: '/auth/google/redirect',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        console.log('Google profile:', profile);

        // Check if user already exists
        const existingUser = await User.findOne({ googleId: profile.id });

        if (existingUser) {
          console.log('User already exists:', existingUser);
          return done(null, existingUser);
        }

        // Create new user
        const newUser = new User({
          username: profile.displayName,
          googleId: profile.id,
          email: profile.emails[0].value,
          profilePicture: profile.photos[0].value,
        });

        const savedUser = await newUser.save();
        console.log('New user created:', savedUser);
        return done(null, savedUser);
      } catch (error) {
        console.error('Error in Google Strategy:', error);
        return done(error, null);
      }
    }
  )
);

// link > https://youtu.be/o9e3ex-axzA
// link => https://youtu.be/nK6fkNShhGc?list=PL4cUxeGkcC9jdm7QX143aMLAqyM-jTZ2x
