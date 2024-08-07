const express = require('express');
const cookieSession = require('cookie-session');
var session = require('express-session')
const passport = require('passport');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile-routes');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');

const app = express();

// set view engine
app.set('view engine', 'ejs');
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}))
// set up session cookies
// app.use(cookieSession({
//   maxAge: 24 * 60 * 60 * 1000,
//   keys: [keys.session.cookieKey]
// }));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());


// connect to mongodb
mongoose
  .connect(keys.mongodb.dbURL)
  .then(() => console.log("Connected"))
  .catch((err) => console.log(err));

// set up routes
app.use('/auth', authRoutes);
app.use('/profile', profileRoutes);

// create home route
app.get('/', (req, res) => {
  res.render('home', { user: req.user });
});

app.listen(3333, () => {
  console.log('app now listening for requests on port 3000');
});
