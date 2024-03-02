const { Router } = require('express');

const multer = require('multer')
const path = require('path')
const bcrypt = require('bcrypt');
const Userschema = require('../models/user');
const { json } = require('body-parser');

const router = Router()
let timer = 0;
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {

    //path.extname(file.originalname) - վերադարձնում է "․"-ից հետո եղած սիմվոլները
    cb(null, `photo(${++timer})` + path.extname(file.originalname))
  }
})

var upload = multer({ storage: storage });



router.get('/', async (req, res) => {
  res.render("index", { error: "" });
})


function cb1(req, res, next) {
  let u = Userschema.findOne({ email: req.body.email })
    .then(result => {
      if (result !== null) {
        res.render("index", { error: "Email Alredy Exist" });
      } else {
        console.log("cb1");
        next();
      }
    })
    .catch(err => console.log(err))
}
router.post("/create", [upload.single('cv'), cb1], async (req, res) => {
  console.log('req.file', req.file)
  const { name, surname, age, email, password } = req.body;
  try {
    //Եթե "model"-ում վալիդացիա կա սա պետքա տեղապօղել այնտեղ Userschema.pre('save',f(){} ֆունկցիայի մեջ
    //  const hashPassword = await bcrypt.hash(password, 10)

    let newUser = new Userschema({
      name,
      surname,
      age,
      email,
      password,
      avatar: req.file.path,
    })
    console.log('newUser', newUser)
    // mongoose 8 no suppert this code!!!
    let r = await newUser.save(function (error) {
      if (error) {
        console.log("mtav", error.errors);
        let message = error.message.slice(error.message.indexOf(":") + 1)
        res.render("index", { error: JSON.stringify(message, null, 2) })
      } else {
        console.log('User ' + newUser.name + ' successfully created!');
      }
    });
  } catch (error) {
    console.log('Sebo:::::::::', error.message)
    res.render("index", { error: error.message })

  }


})

module.exports = router
