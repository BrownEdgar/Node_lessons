const { Router } = require('express');

const router = Router();

// Controller register
const UsersController = require('../Controller/User.controller');

const controller = new UsersController();

router.get('/', controller.testMethods);
router.post('/', controller.addUsers);

module.exports = router;
