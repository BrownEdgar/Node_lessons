const { Schema, model } = require('mongoose')

const Userschema = new Schema({
	username: {
		type: String,
		required: true
	},
	googleId: {
		type: String,
		required: true,
	},
})

module.exports = model('User', Userschema)

