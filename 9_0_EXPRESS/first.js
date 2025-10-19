const path = require('path');

const express = require('express');

const app = express();

const port = 3000;
console.log(`node.env ${process.env.NODE_ENV}`);
console.log(app.get('env'));
/* app.set("view engine", 'ejs'); */

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.get('/home', (_req, res) => {
  console.log('home');
  res.send('home');
});

app.get('/', (_req, res) => {
  res.render('index', {
    title: 'hello World',
  });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
