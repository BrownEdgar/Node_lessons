const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");


const Schema = mongoose.Schema;

const userDataSchima = new Schema({
	title: {
		type: String,
		required: true
	},
	content: String,
	author: String
}, 
{
	collection: "user-Data"
});


const UserData = mongoose.model("UserData", userDataSchima);


/* GET home page. */
router.get('/', function (req, res, next) {
	UserData.find()
		.then(function (doc) {
			res.render("index", { items: doc });
		})
});

router.post('/insert', function (req, res, next) {
	const item = {
		title: req.body.title,
		content: req.body.content,
		author: req.body.author
	};
	const data = new UserData(item);
	data.save();
	res.redirect('/');
});




router.post('/update', function (req, res, next) {
	const item = {
		title: req.body.title,
		content: req.body.content,
		author: req.body.author
	};
	const id = req.body.id;
	UserData.findById(id, function (err, doc) {
		if (err) {
			console.log("im errory")
		}
		doc.title = req.body.title;
		doc.content = req.body.content;
		doc.author = req.body.author;
		data.save();
	})

});
router.post('/delete', function (req, res, next) {
	const id = req.body.id;
	UserData.findByIdAndRemove(id).exec();
});
module.exports = router;
