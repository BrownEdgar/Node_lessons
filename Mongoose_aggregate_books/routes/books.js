const { Router } = require('express');
const ProductSchema = require('../models/Product');
const data = require("../helpers/data.json")

const router = Router()

// Controller register
const ClientController = require('../Controller/BooksController');
const controller = new ClientController();



router.get('/', controller.getAll)

module.exports = router