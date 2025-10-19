const mongoose = require('mongoose');

const BookSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  author: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  languages: {
    type: String,
    enum: ['eng', 'rus', 'hy'],
    require: true,
  },
  pageCount: {
    type: Number,
    min: 50,
    max: 2000,
  },
  poster: {
    type: String,
  },
});

module.exports = mongoose.model('Book', BookSchema);
