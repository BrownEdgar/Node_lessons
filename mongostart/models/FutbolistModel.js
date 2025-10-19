const { Schema, model } = require('mongoose');

const Futbolist = new Schema({
  name: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  position: {
    type: String,
    required: true,
    enum: ['a', 'm', 'd', 'g'],
  },
  age: {
    type: Number,
    required: true,
  },
  team: {
    type: String,
    required: true,
  },
});
module.exports = model('Futbolist', Futbolist);
