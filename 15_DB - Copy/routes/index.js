var express = require('express');
var router = express.Router();
const mongoose = require("mongoose");
mongoose.connect("localhost:27017/test");

var Schema = mongoose.Schema;

var userDataSchima = new Schema({
	title: {
		type: String,
		required: true
	},
	content: String,
	author: String
}, {
	collection: "user-Data"
});


var UserData = mongoose.model("UserData", userDataSchima);


/* GET home page. */
router.get('/', function(req, res, next) {
 UserData.find()
 .then(function(doc){
	 res.render("index", {items:doc});
 })
});

router.post('/insert', function (req, res, next) {
			const item ={
				title: req.body.title, 
				content: req.body.content,
				author: req.body.author
			};
var data = new UserData(item);
data.save();
				res.redirect('/');
});
router.post('/update', function (req, res, next) {
	const item = {
		title: req.body.title,
		content: req.body.content,
		author: req.body.author
	};
	var id = req.body.id;
	 UserData.findById(id, function(err, doc){
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
	var id = req.body.id;
	UserData.findByIdAnnRemove(id).exec();
});
module.exports = router;
