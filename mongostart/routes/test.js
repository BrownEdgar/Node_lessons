const { Router } = require('express')
const Book = require('../models/Book')

const router = Router()

router.get('/',  (req, res) => {
	Book.find({})
		.then(books => res.send(books))
		.catch(err => res.status(500).send())
})
router.get('/count',  (req, res) => {
	Book.countDocuments()
	.then(count => res.json({count}))
	.catch(err=> console.log('err', err))
})

router.get('/:id', async (req, res) => {
	const _id = req.params.id;
	Book.findById({_id})
		.then(book => {
			if (!book) {
				return res.status(404).send()
			}
			res.send(book)
		})
		.catch(err => res.status(500).send())
})


router.post('/', async (req, res) => {
	const { author, title, type, } = req.body;
	console.log({ author, title, type, } )
	let newBook = new Book({
		author,
		title,
		type
	})
	newBook.save()
		.then(() => res.status(201).send(newBook))
		.catch(err => {
		res.status(400)
		res.send(err)
	})
})
router.put('/:id', async (req, res) => {
	const _id = req.params.id;
	
	Book.findByIdAndUpdate(_id,
		{ title: "Gondar" })
		.then((result) => {
			console.log('result', result);
			return Book.countDocuments({ title: "Gondar" })
		})
		.then((result) => {
			console.log('result', result);
			
		})
		.catch(err => {
			res.status(400)
			res.send(err)
		})

})
router.put('/updatefield/:id', async (req, res) => {
	const _id = req.params.id;
console.log("Sad");
	// Book.updateOne(
	// 	{author:"Remark"},
	// 	{ author: "BlaBLabla"},
	// 	(err, user) => {
	// 		if (err) {
	// 			res.send(err)
	// 		} else {
	// 		res.send(user)
	// 		}
	// 	}
	// )
	Book.findOneAndUpdate({ _id }, { "title": "Jumanji" }, (err, user) => {
		if (err) {
			res.send(err)
		} else {
			res.send(user)
		}
	})
})

router.delete('/:id', async (req, res) => {
	const _id = req.params.id;
	const book = await Book.findByIdAndDelete({_id})
	res.send(book)
})





module.exports = router
