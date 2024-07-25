const { Schema, model } = require('mongoose');

const UserSchema = Schema({
  title: {
    type: String,
    required: [true, "post title is required field"]
  },
  img: {
    data: Buffer,
    contentType: String,
  },
  desc: {
    type: String,
    required: [true, "desc title is required field"],
    minLength: 20,
  },
  longdesc: {
    type: String,
    required: [true, "longdesc title is required field"],
    minLength: 40,
    maxLength: 25000,
  },
})

module.exports = model("post", UserSchema);