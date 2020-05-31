const mongoose = require("mongoose");


const userSchema = mongoose.Schema({
    sepakan: {
		type: String,
        required:true
    },
	product: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Product',
		required: true
	},
	order: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Order',
		required: true
	}
});


module.exports = mongoose.model("User", userSchema);