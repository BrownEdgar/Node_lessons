const mongoose = require("mongoose");

const NotesSchema = mongoose.Schema({
	note:{
		type: String,
		required: [true, "field is required, please add a note"],
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	updateAt: {
		type: Date,
		default: null
	},
	deletedAt: {
		type: Date,
		default: null
	}
});
module.exports = mongoose.model("Notes", NotesSchema);


// 	email: {
// type: String,
// 	max: 255,
// 	min: 6
// 	},
// gender: {
// 	type: String,
// 		enum: ["male", "female"]
// },
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8" />
		
	
	<title>Document</title>
</head>
<body>
	
</body>
</html>