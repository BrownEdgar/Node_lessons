const cookieSession = require('cookie-session');
const cors = require('cors');
const express = require('express');
const passport = require('passport');

const app = express();
const port = 3000;
require('./passport-config');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.use(passport.initialize());
app.use(passport.session());

app.use(
  cookieSession({
    name: 'pass-session',
    keys: ['key1', 'key2'],
  })
);

app.get('/', (req, res) => {
  res.send('welcome, Please Login!');
});

app.get('/login', (req, res) => {
  res.send('Login Error 🎃');
});

app.get('/success', isLogin, (req, res) => {
  res.send(`Welcome ${req.session.user.displayName}`);
});

app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

app.get(
  '/auth/google/redirect',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/success');
  }
);

function isLogin(req, res, next) {
  if (req.session.user) {
    next();
  } else {
    res.sendStatus(401);
  }
}
app.get('/logout', (req, res) => {
  req.session = null;
  req.logOut();
  res.redirect('/');
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
