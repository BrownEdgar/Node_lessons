const { Schema, model } = require('mongoose');
const WineSchema = new Schema({
	_id: {
		type: Schema.Types.ObjectId,
	},
	kind: {
		type: String,
		enum: ["white", "red"],
		required: [true, 'kind of wine is required']
	},
	winename: {
		type: String,
		required: true,
	},
	company:{
		type: {name: String, address:String,city:String},
		default:{}
	},
	price: {
		type: Number,
		required: [true, 'wine must have a "price"']
	},
	bottleSize: {
		type: Number,
		required: [true, 'bottle size is required'],
		enum:[0.5, 0.7, 1, 1.5]
	},
	types: {
		type: String,
		enum: ["dry", "semi-dry", "sweet","semi-sweet"],
		required: [true, 'types of wine is required, es: "dry"']
	},
	dom:{
		type:Date,
		required:true,
		default: Date.now 
	},
	expiryDate:{
		type:Date,
		required:true,
		default: () => Date.now() + 365 * 24 * 60 * 60 * 1000
	},
})


module.exports = model('Wine', WineSchema)
