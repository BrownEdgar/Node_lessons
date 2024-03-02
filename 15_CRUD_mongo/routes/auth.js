const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
const { registerValidation } = require('../validation');

router.get('/register', async (req, res) => {
  res.json({ message: 'Regiter page' });
});

router.post('/register', async (req, res) => {
  //DATA VALIDATE BEFORE MAKE A USER
  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  //Create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  });
  const { error } = registerValidation(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  //check user in db 
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).json({ message: "email alredy exists" });
  try {
    const savedUSer = await user.save();
    res.json({ user: user._id });
  } catch (error) {
    res.status(400).json({ messsage: error });
  }
});
module.exports = router;
