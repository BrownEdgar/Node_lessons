const mongoose = requre("mongoose");

const orederSchema = mongoose.Schema({
    id:{
        type:  mongoose.Schema.Types.ObjectId,
    },
    product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required:true
    },
    quantity: {
		type: Number,
		default: 1
	}
})
module.exports = mongoose.model("Order", orederSchema) 