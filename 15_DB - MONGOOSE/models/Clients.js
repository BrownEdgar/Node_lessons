const mongoose = require('mongoose');

const ClientSchema = mongoose.Schema({
  name: {
    type: String,
    maxLength: 20,
    minLength: 3,
    require: [true, 'name field ise Required'],
  },
  surname: {
    type: String,
    minLength: 5,
    require: [true, 'surname field ise Required'],
  },
  password: {
    type: String,
    validate: (value) => {
      const hasNumber = value.match(/\d/g);
      const hasupperCase = value.match(/[A-Z]/g);
      if (!hasNumber) {
        throw new Error('Password must by contain number');
      }
      if (!hasupperCase) {
        throw new Error('Password must by contain at least uppercase');
      }
      return true;
    },
    minLength: [8, 'Password cant by low at 8 charasters'],
  },
  age: {
    type: Number,
    min: 18,
    max: 90,
  },
  email: {
    type: String,
  },
});

module.exports = mongoose.model('Testusers', ClientSchema);
