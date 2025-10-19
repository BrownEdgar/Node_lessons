const { Schema, model } = require('mongoose');

const Girqschema = new Schema({
  author: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
    enum: ['a', 'b', 'c'],
  },
  price: {
    type: Number,
    required: true,
  },
  pageCount: {
    type: Number,
    required: true,
  },
});

module.exports = model('Girq', Girqschema);
