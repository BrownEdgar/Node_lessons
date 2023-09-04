const express = require('express');
const path = require('path');
const router = express.Router();
const Book = require("../models/Books");
const multer = require("multer");


// Controllers inpots
const BooksController = require('../Controller/BooksController');
const controller = new BooksController();

let timer = 0;
const storage = multer.diskStorage({
	destination:  function(req,file,cb){
		cb(null, "./uploads")
	},
	filename: function(req,file,cb){
		console.log("file:", file);
		cb(null, `photo(${++timer})` + path.extname(file.originalname))
	}
})



const upload = multer({storage: storage})

router.get("/", controller.getAllBooks)

router.post("/", upload.single("poster"), controller.createNewOneBook)



module.exports = router;