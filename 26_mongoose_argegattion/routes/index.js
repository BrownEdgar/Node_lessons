const { Router } = require('express');

const Userschema = require('../models/Users');

const router = Router();

router.get('/', async (req, res) => {
  res.render('index');
});
router.post('/create', async (req, res) => {
  const { name, surname, age, email } = req.body;
  const newUser = new Userschema({
    name,
    surname,
    age,
    email,
  });
  newUser.save();
  res.redirect('/');
});

module.exports = router;
