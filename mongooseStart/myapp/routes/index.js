const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', (_req, res) => {
  res.render('pages/index', {
    title: 'Ejs Title',
    skills: ['html', 'css', 'Java Script', 'React.js', 'Node.js', 'Python'],
    bool: false,
  });
});

module.exports = router;
