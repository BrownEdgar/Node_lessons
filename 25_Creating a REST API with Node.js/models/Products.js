const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
	id: {
			type: mongoose.Schema.Types.ObjectId,
		},	
	name:{
		type: String,
		required:true,
		max:255,
		min:6
	},
	price: {
		type: Number,
		required: true,
	}
});


module.exports = mongoose.model("Product", productSchema);