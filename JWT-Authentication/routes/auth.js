const bcryptjs = require('bcryptjs');
const { Router } = require('express');
const jwt = require('jsonwebtoken');

const keys = require('../config/keys');
const User = require('../models/User');

const router = Router();

router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashPassword = await bcryptjs.hash(password, 10);
    const newUser = new User({
      email,
      password: hashPassword,
    });
    await newUser.save();
    res.status(201).json({ newUser });
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = User.find({ email });
  try {
    if (!user) {
      res.status(404).send('user not Found');
      res.end();
    }
    const hashPassword = bcryptjs.compareSync(password, user.password);
    if (!hashPassword) {
      res.status(401).send('invalid password');
      res.end();
    }
    const token = jwt.sign({ email }, keys.secret, { expiresIn: '1h' });
    res.status(201).json({ token });
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
