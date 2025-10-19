const path = require('path');

const express = require('express');

const router = express.Router();
const multer = require('multer');

// Controllers inpots
const BooksController = require('../Controller/BooksController');
const Book = require('../models/Books');

const controller = new BooksController();

let timer = 0;
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, './uploads');
  },
  filename(req, file, cb) {
    console.log('file:', file);
    cb(null, `photo(${++timer})${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage });

router.get('/', controller.getAllBooks);

router.post('/', upload.single('poster'), controller.createNewOneBook);

module.exports = router;
