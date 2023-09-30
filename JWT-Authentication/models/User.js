const { Schema, model } = require('mongoose');
const bcrypt = require('bcryptjs');
const Userschema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
  },
})

Userschema.static.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (isPasswordValid) {
      return user;
    }
  }
  throw Error("Invalid Email")
}

module.exports = model('User', Userschema)
