/// //////////////////////////////////////////////////////
// 1.PassportJS — это middleware для авторизации под node.js. Passport поддерживает авторизацию с помощью огромного количества сервисов, включая «ВКонтакте» и прочие твиттеры.

/// //////////////////////////////////////////////////////
const bcrypt = require('bcryptjs');
const { Router } = require('express');

const router = Router();
// Load User model
const { forwardAuthenticated } = require('../config/auth');
const User = require('../models/User');

// Login Page
router.get('/login', forwardAuthenticated, (req, res) => res.render('login'));

// Register Page
router.get('/register', forwardAuthenticated, (req, res) => res.render('register'));

// Register
router.post('/register', (req, res) => {
  const { name, email, password, password2 } = req.body;
  const errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password !== password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 6) {
    errors.push({ msg: 'Password must be at least 6 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2,
    });
  } else {
    User.findOne({ email }).then((user) => {
      if (user) {
        errors.push({ msg: 'Email already exists' });
        res.render('register', {
          errors,
          name,
          email,
          password,
          password2,
        });
      } else {
        const newUser = new User({
          name,
          email,
          password,
        });

        bcrypt.genSalt(10, (err, salt) => {
          if (err) {
            throw err;
          }
          bcrypt.hash(newUser.password, salt, (_err, hash) => {
            newUser.password = hash;
            newUser
              .save()
              .then(() => {
                req.flash('success_msg', 'You are now registered and can log in');
                res.redirect('/users/login');
              })
              .catch((err2) => console.log(err2));
          });
        });
      }
    });
  }
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;
