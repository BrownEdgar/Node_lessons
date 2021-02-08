const mongoose = require("mongoose");


const ProductSchema = mongoose.Schema({
	name:{
		type: String,
		required: true
	},
	price:{
		type:Number,
		required: true,
		min:1,
		max:10000,
		default: 1560
	},
	gender:{
		type: String,
		enum:["male", "female"],
		required: true,
	},
	size: {
		type: String,
		enum: ["s", "m", "l"],
		required: true,
	}
})

module.exports = mongoose.model("Product", ProductSchema );