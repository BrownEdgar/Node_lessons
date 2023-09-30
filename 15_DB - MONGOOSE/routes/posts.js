const express = require('express');
const router = express.Router();
const Post = require('../models/Post');


/* GET users listing. */
router.get('/', async (req, res) => {
  try {
	  const posts = await Post.find();
	   res.json(posts);
  } catch (error) {
	  res.json({message:error})
  }
});

router.post('/', async (req, res) =>{
	const post = new Post({
		title:req.body.title,
		discription: req.body.discription
	});

	 post.save();//Եթե այսպես թողնենք հարցումը երբեք չի ավարտվի "pannding"
	res.end("ok")
});


router.get('/:postId', async (req, res) => {
	try {
		const post = await Post.findById(req.params.postId);
		res.json(post);
	} catch (error) {
		res.json({message: error});
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
		$set:{
			title: req.body.title,
			discription: req.body.discription,
			}
		}).then(data => {
			res.json({
				message:data
			})
		}).catch(err => res.json({
			message: err
		}))
})
router.delete('/:id', async function (req, res) {
  const id = req.params.id;
	Post.deleteOne({_id:id})
	.then(data => {
		res.json({
			message:data,
			result:"Posty jnjvac e"})
	}).catch(err => res.json({err}))

});

router.delete('/all/:title', async function (req, res) {
	const title = req.params.title;
	Post.deleteMany({ title })
		.then(data => {
			res.json({
				message: data,
				result: "Posty jnjvac e"
			})
		}).catch(err => res.json({ err }))

});

module.exports = router;
