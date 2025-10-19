const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', {
    title: 'Form Validation',
    success: req.session.success,
    errors: req.session.errors,
  });
  req.session.errors = null;
});

router.post('/submit', (req, res, next) => {
  /* Stugum */
  req.check('email', 'Invalid email adress').isEmail();
  req.check('password', 'Password invalid').isLength({ min: 4 }).equals(req.body.confirmPassword);

  const errors = req.validationErrors();
  if (errors) {
    req.session.errors = errors;
    req.session.success = false;
  } else {
    req.session.success = true;
  }
  res.redirect('/');
});
module.exports = router;
