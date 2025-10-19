const express = require('express');

const userController = require('../controllers/user.controller');
const validate = require('../middlewares/validate');
const { createUserSchema, getUserSchema } = require('../validators/user.validator');

const router = express.Router();

router
  .route('/')
  .get(userController.getAllUsers)
  .post(validate(createUserSchema), userController.createUser);

router
  .route('/:id')
  .get(validate(getUserSchema), userController.getUser)
  .patch(validate(getUserSchema), userController.updateUser)
  .delete(validate(getUserSchema), userController.deleteUser);

module.exports = router;
