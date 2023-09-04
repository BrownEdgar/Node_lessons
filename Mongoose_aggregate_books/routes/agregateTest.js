// //distinct մեթթոդը կվերադարձնի փոխանցած "key"-ի բոլոր արժեքները

const { Router } = require('express');
const ProductSchema = require('../models/Product');
const data = require("../helpers/data.json")

const router = Router()

// Controller register
const ClientController = require('../Controller/ClientController');
const controller = new ClientController();

router.get('/', async (req, res) => {
	// ProductSchema.find({})
	// 	.then((result) => res.status(200).send(result))
	// 	.catch(err => res.status(500).send())


	
	// let docs = await ProductSchema.aggregate([
	// 	{ $match: { total: { $gte: 10000 } } }
	// ]);

	// կվերադարձնի բոլոր name-րը իրենց առեվտրի total դաշտով
	
	// let docs = await ProductSchema.aggregate([
	// 	{ $match: {} },
	// 	{ $group: { _id: '$name', total: { $sum: "$total" } } }
	// ])
	try {
		//կվերադարձնի բոլոր "Karen"-րին   { "name": "Karen", "age": 25}, ձևով
	// let docs = await ProductSchema.aggregate([
	// 	{ $match: { name: "Karen" } },
	// 	{ $project: { name: 1, age: 1, _id: 0 } }
	// ])
	
	let docs = await ProductSchema.aggregate([
		
		{ $group: { _id: { age:'$age', name:"$name"}} }
	])

	res.status(200).send(docs)

} catch (error) {
	console.log(error)
	res.status(200).send(error)
}

	

})

router.get('/add', async (req, res) => {
	//distinct մեթթոդը կվերադարձնի փոխանցած "key"-ի բոլոր արժեքները
	ProductSchema
		.insertMany(JSON.stringify(data))
		.then((result) => res.status(200).json({ message: "success", result }))
		.catch(err => res.status(500).send(err))

})

router.post('/addone', controller.addClients);

router.get('/total', async (req, res) => {
	//distinct մեթթոդը կվերադարձնի փոխանցած "key"-ի բոլոր արժեքները հակառակ դեպքում ՝ {}
	try {
		let result = await ProductSchema.distinct("total");
		if (!result) {
			throw new Error("not found")
		}
		res.status(200).send(result)
	} catch (error) {
		res.status(500).send(error)
	}

})

router.get('/caxs', async (req, res) => {
	//_id: "$product" փոխելով կստանանք թե ընդհանուր ամեն մի ւտելիքի վրա ինչքան է ցախսվել   Օրինակ․՝
	//{
	// 	"_id": "ayl",
	// 	"total": 34740
	// },
	try {
		ProductSchema.aggregate(
			[
				{ $match: {} },
				{ $group: { _id: "$name", total: { $sum: "$total" } } },
				{ $sort: { total: 1 } } // "-1" ըստ նվազման "1" ըստ աճման
			]
		).then((result) => res.status(200).send(result))
			.catch(err => res.status(500).send())
	} catch (error) {
		res.status(500).send(error)
	}

})

router.get('/caxs/:name', async (req, res) => {
	const name = req.params.name
	let count = await ProductSchema.countDocuments({ name })

	try {
		if (count == 0) {
			res.status(500).json({ message: "Seller is not found!" })

		}
		ProductSchema.aggregate(
			[
				{ $match: { name: { $in: [name] } } },
				{ $group: { _id: "$name", total: { $sum: "$total" } } },
				{ $sort: { total: 1 } } // "-1" ըստ նվազման "1" ըստ աճման
			]
		).then((result) => res.status(200).send(result))
			.catch(err => res.status(500).send())
	} catch (error) {
		res.status(500).send(error)
	}

})

router.get('/special/:name', async (req, res) => {
	const name = req.params.name
	let count = await ProductSchema.countDocuments({ name })

	try {
		if (count == 0) {
			res.status(500).json({ message: "Seller is not found!" })
		}
		ProductSchema.aggregate(
			[
				// այս հարցումը կվերադարձնի կոնկրերդ գնորդի այն օբյեկտները որտեղ total-ը փոքր է "5000"-ից
				// $and -ը թույլ է տալիս ստեղծել համաղումբ զանգվածի տեսքով
				{ $match: { $and: [{ name: name }, { total: { $gt: 5000 } }] } },

			]
		).then((result) => res.status(200).send(result))
			.catch(err => res.status(500).send())
	} catch (error) {
		res.status(500).send(error)
	}

})


router.get('/group', async (req, res) => {
	try {
		ProductSchema.aggregate(
			[
				// ՎԵՐԱԴԱՐՁՆՈՒՄ Է ԲՈԼՈՐ "product" ԴԱՇՏԻ ԱՐԺԵՔՆԵՐԸ  [ {"_id": "texnika"},{"_id": "grenakan"} ...]
				{ $group: { _id: { product: "$product" } } },

				// ՉԻ ՎԵՐԱԴԱՐՁՆԻ ՄԻԱՅՆ ԱՅՆ ՕԲՅԵԿՏՆԵՐԸ ՈՐՏԵՂ   "product" ԵՎ "total" ԴԱՇՏԵՐԸ ԿԿՐԿՆՎԵՆ
				// { $group: { _id: { product: "$product", total: "$total" } } },
			]
		)
			.then((result) => res.status(200).send(result))
			.catch(err => res.status(500).send())
	} catch (error) {
		res.status(500).send(error)
	}

})

router.get('/matchgroup', async (req, res) => {
	try {
		ProductSchema.aggregate(
			[
				//ՀԱՄՏԵՂՈՒՄ -կվերադարձնի "Karen"-ի միայն "{product: "ayl"}" տիպի գնումները
				{ $match: { name: "Karen" } },
				{ $group: { _id: { product: "ayl" } } },

			]
		)
			.then((result) => res.status(200).send(result))
			.catch(err => res.status(500).send())
	} catch (error) {
		res.status(500).send(error)
	}

})

module.exports = router
