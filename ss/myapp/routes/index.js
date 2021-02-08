var express = require('express');
var router = express.Router();
const mongoose = require("mongoose")


mongoose.connect("mongodb://localhost:27017/klaus", { useNewUrlParser: true }, (err) => {
	if (err) {
		console.log(err);
	} else {
		console.log("DB connected");
	}
})

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


module.exports = router;
