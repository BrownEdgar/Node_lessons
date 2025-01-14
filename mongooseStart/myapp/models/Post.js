const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    validate(value) {
      if (value.length < 2) {
        throw new Error('Too short title');
      }
      return true;
    },
  },
  discription: {
    type: String,
    required: true,
    validate(value) {
      if (value.length < 20) {
        throw new Error('Too short discription');
      }
      return true;
    },
  },
  img: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Post', PostSchema);
