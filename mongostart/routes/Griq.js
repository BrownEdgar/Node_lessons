const { Router } = require('express');
const { estimatedDocumentCount } = require('../models/Girq');
const Girq = require('../models/Girq')

const router = Router()

router.get('/all', async (req, res) => {
	try {
		let response = await Girq.find({});
		res.status(200).send(response)
	} catch (error) {
			res.sendStatus(500).send({error})
	}

})
router.get('/add',  (req, res) => {
	console.log("dsa")
	Girq.insertMany([
		{ author:"Karlos Ruis Safon", title:"Marina", type:'a', price:4800, pageCount:214},
		{ author:"Remark", title:"Haxtakan kamar", type:'c', price:5000, pageCount:500},
		{ author:"Karlos Ruis Safon", title:"Ten vetra", type:'b', price:4800, pageCount:150},
		{ author:"Remark", title:"Tri tavarisha", type:'a', price:8800, pageCount:321},
		{ author:"Stiven Covi", title:"7Hebbits", type:'a', price:3600, pageCount:125},
		{ author:"Karlos Ruis Safon", title:"Marina", type:'b', price:870, pageCount:60},
		{ author:"Stiven Covi", title:"8hebbits", type:'b', price:9600, pageCount:845},
		{ author:"Karlos Ruis Safon", title:"Marina", type:'c', price:1600, pageCount:214}
	])
	.then(result  => res.status(200).send(result))
		.catch(err => res.status(500).send(err))

})

// router.get('/:category', async (req, res) => {

// 	let category = req.params.category;
// 	console.log('category', category)

// 	try {
// 		let c = await Girq.countDocuments({ author: category});
// 		res.json({ message: `duq uneq ${category} hexinakic ${c} hat girq`})
// 	} catch (error) {
// 		res.status(500).send({ error })
// 	}

// })
router.get('/aggregate', async (req, res) => {
	try {
		let c = await Girq.aggregate([
			{$match: {type: "a"}},
			{$group:{_id: "$type", total:{$sum: "$price"}}}	
		])
		res.json({ message: c })
	} catch (error) {
		res.status(500).send({ error })
	}
})

module.exports = router

