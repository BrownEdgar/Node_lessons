var express = require('express');
var router = express.Router();

const UserController = require('../controllers/User.controller');
const authenticateToken = require('../middlewaries/authenticateToken');
const controller = new UserController()

/* GET users listing. */
router.get('/', authenticateToken, controller.getAllUsers);

module.exports = router;
