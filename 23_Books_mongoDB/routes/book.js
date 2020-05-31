const express = require('express');
const router = express.Router();
/*const verify = require('./token');*/
const Books = require('../models/Books');


router.get('/', async(req, res)=> {
	res.send(`dsfj lksfdl`);
});

router.post('/', async(req, res)=> {
const book = new Books({
		author:"SSSS",
		bookstitle:"asmn",
		discription:"las",
		price:"126",
	});

	try {
			const savedBook = await book.save();
			res.send({book:book._id});
		} catch (error) {
			 res.status(400).send(error);
		}
		res.end();
});
module.exports = router;