const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	username: { 
		type: String, 
		required: true,
		min: 3, 
		
	},
	email: {
		type: String,
		trim: true,
		unique: [true,"Email alredy exist"],
		required: 'Email address is required',
		
	},
	address: {
		"street": {type: String},
		"suite": { type: String },
		"city": { type: String },
		"zipcode": {
			type: String,
			required: true,
			validate: {
				validator: (v) => /\d{4,15}/.test(v),
				message: '{VALUE} is not a valid zipcode try "90566-7771" patern'
			}	
		},
		"geo": {
			"lat": { type: String },
			"lng": { type: String },
		}
	},
	phone: {
		type: String,
		required: true,
		validate:{
			validator: (v) => /^[0-9-x\s().]+$/.test(v),
			message: '{VALUE} is not a valid phone number! try patern'
		}	
	},
	"website": { type: String, required: [true, "website field is required"]},
	"company": {
		"name": { type: String, required: [true, "company.name field is required"] },
		"catchPhrase": { type: String, required: true },
		"bs": { type: String, required: true },
	}

})

module.exports = model('ClientInfo', UserSchema)

