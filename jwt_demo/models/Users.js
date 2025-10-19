const bcryptjs = require('bcryptjs');
const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  email: {
    type: String,
    require: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
    min: 8,
    max: 18,
    validate: (value) => {
      if (/^[A-Z]/.test(value.trim())) {
        return true;
      }
      throw new Error('Password must by start with Uppercase');
    },
  },
});

userSchema.pre('save', function (next) {
  const hashPassword = bcryptjs.hashSync(this.password, 10);
  this.password = hashPassword;
  next();
});

userSchema.post('save', (err, doc, next) => {
  console.log('err', err);
  // "E11000 duplicate key error collection"
  if (err.code === 11000) {
    return next(Error('Duplicate email'));
  }
  next(err);
});

userSchema.static.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const isPasswordValid = bcryptjs.compareSync(password, user.password);
    if (isPasswordValid) {
      return user;
    }
  }
  throw Error('Invalid Email');
};

module.exports = model('user', userSchema);
