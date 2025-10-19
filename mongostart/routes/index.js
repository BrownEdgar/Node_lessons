const path = require('path');

const { Router } = require('express');
const multer = require('multer');

const Userschema = require('../models/user');

const router = Router();
let timer = 0;
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads/');
  },
  filename(req, file, cb) {
    // path.extname(file.originalname) - վերադարձնում է "․"-ից հետո եղած սիմվոլները
    cb(null, `photo(${++timer})${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

router.get('/', (_req, res) => {
  res.render('index', { error: '' });
});

function cb1(req, res, next) {
  const u = Userschema.findOne({ email: req.body.email })
    .then((result) => {
      if (result !== null) {
        res.render('index', { error: 'Email Alredy Exist' });
      } else {
        console.log('cb1');
        next();
      }
    })
    .catch((err) => console.log(err));
}
router.post('/create', [upload.single('cv'), cb1], async (req, res) => {
  console.log('req.file', req.file);
  const { name, surname, age, email, password } = req.body;
  try {
    // Եթե "model"-ում վալիդացիա կա սա պետքա տեղապօղել այնտեղ Userschema.pre('save',f(){} ֆունկցիայի մեջ
    //  const hashPassword = await bcrypt.hash(password, 10)

    const newUser = new Userschema({
      name,
      surname,
      age,
      email,
      password,
      avatar: req.file.path,
    });
    console.log('newUser', newUser);
    // mongoose 8 no suppert this code!!!
    const r = await newUser.save((error) => {
      if (error) {
        console.log('mtav', error.errors);
        const message = error.message.slice(error.message.indexOf(':') + 1);
        res.render('index', { error: JSON.stringify(message, null, 2) });
      } else {
        console.log(`User ${newUser.name} successfully created!`);
      }
    });
  } catch (error) {
    console.log('Sebo:::::::::', error.message);
    res.render('index', { error: error.message });
  }
});

module.exports = router;
