var express = require('express');
var router = express.Router();
var Post = require('../models/Post');

/* GET users listing. */
router.get('/', async (req, res) => {
  try {
	  const posts = await Post.find();
	   res.json(posts);
  } catch (error) {
	  res.json({message:error})
  }
});

router.post('/', (req, res) =>{
	const post = new Post({
		title:req.body.title,
		discription: req.body.discription
	});

	post.save();//Եթե այսպես թողնենք հարցումը երբեք չի ավարտվի "pannding"
	res.redirect('/posts');
});


router.get('/:postId', async (req, res) => {
	try {
		const post = await Post.findById(req.params.postId);
		res.json(post);
	} catch (error) {
		  res.json({
		  	message: error
		  });
	}
	
});
module.exports = router;
