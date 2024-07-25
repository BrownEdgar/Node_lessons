const router = require('express').Router();
const passport = require('passport');

// auth login
router.get('/login', (req, res) => {
  res.render('login', { user: req.user });
});


router.get('/logout', (req, res) => {
  req.logout(function (err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

router.get('/google', passport.authenticate('google', {
  scope: ['profile']
}));


router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  console.log('req::::', req.user)
  res.render('profile', { user: req.user });
});

module.exports = router;
