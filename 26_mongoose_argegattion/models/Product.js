const { Schema, model } = require('mongoose');

const ProductSchema = new Schema({
  _id: {
    type: Schema.Types.ObjectId,
  },
  product: {
    type: String,
    required: true,
    enum: ['ayl', 'uteliq', 'texnika', 'grenakan'],
  },
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: 18,
    max: 65,
  },
  total: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ['male', 'female'],
  },
  hobbies: {
    type: [String],
    required: true,
    default: undefined,
  },
});

module.exports = model('ClientInfo', ProductSchema);
