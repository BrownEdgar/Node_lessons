const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  console.log('pag start');

  res.render('test', {
    title: 'Express',
    classname1: 'box',
    bool: true,
  });
});

module.exports = router;
