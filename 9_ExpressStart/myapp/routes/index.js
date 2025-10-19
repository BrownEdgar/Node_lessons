const express = require('express');

const { Errors, ErrorMessages } = require('../errors/ErrorMessages');

const router = express.Router();

/* GET home page. */
router.get('/', (_req, res) => {
  Errors.notfound(res, ErrorMessages.NOT_FOUND.replace(':id', 65321));
});

module.exports = router;
