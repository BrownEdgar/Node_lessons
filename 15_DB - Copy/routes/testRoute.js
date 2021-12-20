const express = require('express');
const router = express.Router();
const Model = require('../models/Clients');



router.get('/:price', async (req, res) => {
	try {
		let allClients = await Model.find();
		res.json(allClients)
	} catch (error) {
		res.json({ errMessage: error})
	}
});


router.post('/', async (req, res) => {
	const  { name, surname, age, password, email } = req.body;
	try {
		let newClient = await new Model({
			name, surname, age, password, email 
		});
		newClient.save((err) => {
			if (err) {
				return res.json({ message: err })
			}
			res.json({ message: "User saved!" })
		})
	
	} catch (error) {
		res.json({ errMessage: error })
	}
});

router.delete('/', async (req, res) => {
	let d = await Model.deleteOne({ name: 'Anadhit' }, (err, result) => {
		console.log({err,result});
	});
	res.json({message:d})
})

module.exports = router;
