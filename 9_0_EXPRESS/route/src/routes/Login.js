const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  console.log(router);
  res.send('gellary page');
});

router.post('/', (req, res) => {
  res.send('post in gellary page');
});

module.exports = router;
