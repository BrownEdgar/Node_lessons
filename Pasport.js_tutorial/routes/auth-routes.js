const router = require('express').Router();
const passport = require('passport');

// Auth login page
router.get('/login', (req, res) => {
  res.render('login', { user: req.user });
});

// Auth logout
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Logout error:', err);
      return res.redirect('/');
    }
    res.redirect('/');
  });
});

// Google OAuth routes
router.get(
  '/google',
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })
);

router.get(
  '/google/redirect',
  passport.authenticate('google', {
    failureRedirect: '/auth/login',
  }),
  (req, res) => {
    res.redirect('/');
  }
);

module.exports = router;
