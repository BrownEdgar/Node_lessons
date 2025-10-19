const { Router } = require('express');

const { books: BooksSchema } = require('../models');

const router = Router();

// Controller register
const BooksController = require('../Controller/BooksController');

const controller = new BooksController();

router.get('/', controller.getAll);

module.exports = router;
