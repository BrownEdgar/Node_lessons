const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const keys = require('./keys')
const User = require('../models/user-model')
// serializeUser որոշում է թե, User-օբյեկտի որ տվյալները պետք է պահպանվեն
// Session-ի մեջ
passport.serializeUser((user, done) => {
  done(null, user.id)
})

//passport.deserializeUser առաջին արգումենտը serializeUser-ում done ֆունկցիային փողանցած 2-րդ արգումենտն է։
passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user)
  })
})

// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: keys.google.clientID,
//       clientSecret: keys.google.clientSecret,
//       callbackURL: 'http://localhost:3000/auth/google/callback',
//     },
//     (accessToken, refreshToken, profile, done) => {
//       console.log('profile:', profile)
//       // ստուգում
//       User.findOne({ googleId: profile.id }).then((currentUser) => {
//         if (currentUser) {
//           done(null, currentUser)
//         } else {
//           // եթե չկա ստեղծում ենք նոր user
//           new User({
//             googleId: profile.id,
//             username: profile.displayName,
//             thumbnail: profile.photos[0].value,
//           })
//             .save()
//             .then((newUser) => {
//               console.log('created new user: ', newUser)
//               done(null, newUser)
//             })
//         }
//       })
//     },
//   ),
// )

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

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret,
      callbackURL: 'http://localhost:3000/auth/google/callback',
    },
    function (accessToken, refreshToken, profile, done) {
      console.log('profile:', profile)

      User.findOne({ googleId: profile.id }).then((currentUser) => {
        if (currentUser) {
          done(null, currentUser)
        } else {
          // եթե չկա ստեղծում ենք նոր user
          new User({
            googleId: profile.id,
            username: profile.displayName,
            thumbnail: profile.photos[0].value,
          })
            .save()
            .then((newUser) => {
              console.log('created new user: ', newUser)
              done(null, newUser)
            })
        }
      })
    },
  ),
)
