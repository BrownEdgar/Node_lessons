const { Schema, model } = require('mongoose');

const Userschema = new Schema({
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
});

module.exports = model('Test', Userschema);
