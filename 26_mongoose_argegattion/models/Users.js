const { Schema, model } = require('mongoose')

const AddressSchema = new Schema({
  street: String, house: Number
})

const Userschema = new Schema({
  name: {
    type: String,
    required: true
  },
  skills: {
    type: [String],
    required: true,
  },
  points: {
    type: [Number],
    required: true,
  },
  age: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  address: {
    type: AddressSchema,
    required: true,
  },
  eyeColor: {
    type: 'string',
    required: true,
    enum: ['black', 'blue', 'brown', 'green']
  },
  salary: {
    type: Number,
    min: 67000,
    max: 1e7,
    required: true
  }
})

module.exports = model('user', Userschema)
//  կա նաև middleware-ր .pre և .post