const { Router } = require('express');

const Userschema = require('../models/user');

const router = Router();

router.get('/', async (req, res) => {
  const result = await Userschema.find({}, { _id: 0 }).select('name surname email password');
  console.log('result', result);
  res.render('users', { layout: './users', users: result }); // Եթե չգրելք ելի "Main.ejs" կնկարի
});

module.exports = router;
