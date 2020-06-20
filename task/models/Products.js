const mongoose = requre("mongoose");

const productSchema = mongoose.Schema({
    id:{
        type:  mongoose.Schema.Types.ObjectId,
    },
    name:{
        type:String,
        required:true
    },
    price: {
		type: Number,
        required:true
	}
})
module.exports = mongoose.model("Product", productSchema) 