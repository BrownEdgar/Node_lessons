const { Router } = require('express');
const passport = require('passport');

const router = Router();

// auth login
router.get('/login', (req, res) => {
  res.render('login', { user: req.user });
});

router.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/auth/login');
  });
});

router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  console.log('req::::', req.user);
  res.render('profile', { user: req.user });
});

module.exports = router;
