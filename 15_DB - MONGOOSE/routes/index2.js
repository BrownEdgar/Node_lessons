const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');

const { Schema } = mongoose;

const userDataSchima = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: String,
    author: String,
  },
  {
    collection: 'user-Data',
  }
);

const UserData = mongoose.model('UserData', userDataSchima);

/* GET home page. */
router.get('/', (req, res, next) => {
  UserData.find().then((doc) => {
    res.render('index', { items: doc });
  });
});

router.post('/insert', (req, res, next) => {
  const item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
  };
  const data = new UserData(item);
  data.save();
  res.redirect('/');
});

router.post('/update', (req, res, next) => {
  const item = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
  };
  const { id } = req.body;
  UserData.findById(id, (err, doc) => {
    if (err) {
      console.log('im errory');
    }
    doc.title = req.body.title;
    doc.content = req.body.content;
    doc.author = req.body.author;
    data.save();
  });
});
router.post('/delete', (req, res, next) => {
  const { id } = req.body;
  UserData.findByIdAndRemove(id).exec();
});
module.exports = router;
