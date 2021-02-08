var express = require('express');
var router = express.Router();
const Product = require('../models/Product')
/* GET users listing. */
router.get('/', async function(req, res) {
  try {
		let result = await Product.find();
		res.json(result)
	} catch (error) {
		res.json({message:error})
	}
});
router.post('/', function (req, res) {
	console.log(req.body.name);
	let product = new Product({
		name: req.body.name,
		price: req.body.price,
		gender: req.body.gender,
		size: req.body.size,
	})
	product.save(function (err) {
		console.log(err);
	});
	res.redirect('/users')
});


router.get('/:postId', async (req, res) => {
	console.log("sad");
	try {
		const post = await Product.find({ "name": "Mayka"});
		res.json(post);
	} catch (error) {
		res.json({
			message: error
		});
	}
});
router.put('/:id', function (req, res, next) {
	console.log('node body', req.body)
	const Productid = req.params.id;
	Product.updateOne({ _id: Productid }, {
		$set: {
			name: req.body.name,
		}
	})
		.then(data => {
			res.json({ message: data });
		})
		.catch(err => res.send(`Notes with '${err.value}' id's is INVALID try again`));

});
module.exports = router;
