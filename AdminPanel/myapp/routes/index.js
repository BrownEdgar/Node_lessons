var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Product = require("../models/user");


/* GET home page. */
router.get('/', (req, res, next) => {
	res.send("Honewds")
});



router.post('/', function (req, res, next) {
	const product = new Product({
		_id:mongoose.Types.ObjectId(),
		name: req.body.name,
		price: req.body.price
	});

	product
		.save()
		.then(result => console.log(result))
		.catch(err => console.log(err));
	res.status(201).json({
		message: "Du karox es",
		createProduct: product
	});
});

module.exports = router;