const express = require('express');

const router = express.Router();

const AuthController = require('../controllers/AuthController');

const controller = new AuthController();

router.post('/sign-in', controller.signin);
router.post('/sign-up', controller.signUp);

module.exports = router;
