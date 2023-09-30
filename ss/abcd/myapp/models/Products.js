const mongoose = require("mongoose");

const ProductsSchema = mongoose.Schema({
	type: {
		type: String,
		required: true,
		enum:["meat", "vegetable", "drink", "householdgoods", "dairy"]
	},
	name: {
		type: String,
		required: true,
		
	},
	price: {
		type: Number,
		required: true,
	
	},
	dom: {
		type: Date,
		required: true,
		default: Date.now
	},
	quantity: {
		type: Number,
		required: true,
		default:1,
	},

	productImage: {
		type: String,
		required: true,
	},
	expiryDate: {
		type: Date,
		required: true,
		default: () => Date.now() + 10 * 24 * 60 * 60 * 1000
	},
});
module.exports = mongoose.model("Product", ProductsSchema);