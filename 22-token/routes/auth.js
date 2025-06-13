var express = require('express')
var router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { registerValidation, loginValidation } = require('../validation')

router.get('/register', async (req, res) => {
  res.send('register page')
})

router.post('/register', async (req, res) => {
  //DATA VALIDATE BEFORE MAKE A USER
  console.log(req.body)
  const { error } = registerValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)
  //check user in db
  const emailExist = await User.findOne({ email: req.body.email })
  if (emailExist) return res.status(400).send('email alredy exists')

  //hash password
  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(req.body.password, salt)
  //Create a new user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword,
  })
  try {
    await user.save()
    res.send({ user: user._id })
  } catch (error) {
    res.status(400).send(error)
  }
})
router.post('/login', async (req, res) => {
  //DATA VALIDATE BEFORE MAKE A USER
  const { error } = loginValidation(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  //check user in db
  const user = await User.findOne({ email: req.body.email })
  if (!user) return res.status(400).send('email is not found')
  //Password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password)
  if (!validPass) res.status(400).send('invalid password')

  //CREATE A TOKEN
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '30s' })
  res.header('authorization', token).send(token)
})
module.exports = router
