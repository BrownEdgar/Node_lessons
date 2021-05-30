const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const Post = require('../models/Post');
const multer = require('multer');

// multer 
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		
		cb(null, './uploads/')
	},
	filename: (req, file, cb) => {
		
		console.log(`file`, file)
		if (file.mimetype === "image/jpeg" || file.mimetype === "image/png" ){
			cb(null, `photo-${Math.random().toString().slice(12)}` + path.extname(file.originalname))
		}else{
			cb(null, false)
		}	
	}
});

const upload = multer({ storage: storage, });


router.get('/', async (req, res) => {
	try {
		const posts = await Post.find();

		res.render('pages/posts', {
			posts,
			error: null
		})
	} catch (error) {
		res.render('pages/posts', {
			posts,
			error: error

		})
	}
});

router.post('/',  [upload.single('image')], async (req, res) => {

	console.log(`req.file`, req.file)
	const post = new Post({
		title: req.body.title,
		discription: req.body.discription,
		img: req.file.filename
	});
	try {
		await post.save((err, data) => {
			if (err) {
				res.json({ err })
			} else {
				console.log(`NEWpost`, data)
				res.redirect('/posts')
			}
		});
	} catch (error) {
		res.json({ error })
	}
});


router.post('/gettitle', async (req, res) => {
	console.log(req.body);
	const { title } = req.body;
	console.log(`title`, title)
	try {
		const posts = await Post.find();
		res.json(posts)
	} catch (error) {
		res.json({ error })

	}
});



router.get('/create', async (req, res) => {

	res.render('pages/createPost', {})
})


router.post('/search', async (req, res) => {
	const { searchValue } = req.body;
	if (searchValue.trim() === "") {
		return res.redirect('/posts')
	}
	try {
		const posts = await Post.find(
			{
				title: { $regex: `${searchValue}`, $options: "i" }
			},
			function (err, docs) {
				if (err) {
					return res.render('pages/posts', {
						posts: [],
						searchValue: err,
					})
				}
				res.render('pages/posts', {
					posts: docs,
					searchValue,
				})
			});

	} catch (error) {
		res.render('pages/posts', {
			error: error
		})
	}
})

router.get('/:postId', async (req, res) => {
	
	try {
		const post = await Post.findById(req.params.postId);
		console.log(`post`, post)
		res.render("pages/specialPast", {
			post
		});
	} catch (error) {
	
		res.render("pages/error", {
			error,
			message: error.message
		})
	}
});

router.put('/:postId', async (req, res) => {
	console.log('node body', req.body)
	const title = req.params.postId;
	Post.updateMany(
		{
			title: title
		},
		{
			$set: {
				title: req.body.title,
				discription: req.body.discription,
			}
		}).then(data => {
			res.json({
				message: data
			})
		}).catch(err => res.json({
			message: err
		}))
})

router.delete('/:id', async function (req, res) {
	const id = req.params.id;
	Post.deleteOne({ _id: id })
		.then(data => {
			res.json({
				message: data,
				result: "Posty jnjvac e"
			})
		}).catch(err => res.json({ err }))

});

module.exports = router;
