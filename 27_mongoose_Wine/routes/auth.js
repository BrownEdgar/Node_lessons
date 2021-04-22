const { Router } = require('express');
const Controller = require('../Controller/Auth');
const controller = new Controller()

const router = Router()

router.post('/register', controller.register);
router.post('/login', controller.login);
router.post('/updatetoken', controller.login);

module.exports = router