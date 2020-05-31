const {Scema, model} = require("mongoose");

const Place = model("Place", {
	name: {
		type: String,
		required: true
	},
	location: {
		lat: Number,
		lng: Number
	},
	userId: {
		type: Scema.Types.ObjectId,
		ref: "User"
	},
	cityId: {
		type: Scema.Types.ObjectId,
		ref: "City"
	},
})

module.exports = Place;