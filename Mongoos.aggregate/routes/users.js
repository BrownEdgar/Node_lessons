const { Router } = require('express');

const Userschema = require('../models/user');

const router = Router();

router.get('/', async (_req, res) => {
  const result = await Userschema.find();
  res.render('users', { layout: './users', users: result }); //  if not write layout, it will render "Main.ejs"
});

module.exports = router;
