const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt');
var validator = require('validator');
const Userschema = new Schema({
	name: {
		type: String,
		required: true
	},
	surname: {
		type: String,
		required: true,
	},
	age: {
		type: Number,
		required: true,
		validate(value) {
			if (!validator.isNumeric(value)) {
				throw new Error("validate run: ", value + "is invalid value")	
		}
		}
	},
	email: {
		type: String,
		required: true
	},
	password:{
		type: String,
		required: true,
		maxlength: ["15","erkara aper"],
		minlength: ["4","karja axper"],
		validate: {
			validator:function(pass){
				let test = /^[A-Z]+[a-z0-9]{3,16}/g.test(pass);
				console.log('test', test)
				return test
			},
			message: props => `${props.value} is invalid password`
		}
	},
	avatar:{
		type: String,
		required: true,	
	}
})
Userschema.pre('save', async function(){
	if(this.isModified("password")){
		this.password = await bcrypt.hash(this.password, 10)
	}
})
module.exports = model('User', Userschema)
