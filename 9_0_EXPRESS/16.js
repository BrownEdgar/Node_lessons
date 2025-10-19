const path = require('path');

const express = require('express');

const app = express();
const port = 3003;

app.get('/', (req, res) => {
  res.send('Home page');
});
app.get('/:a-:b', (req, res) => {
  const result = parseInt(req.params.a, 10) + parseInt(req.params.b, 10);
  res.send(200, result);
});
app.get('/aaa', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});
app.get('/download', (req, res) => {
  res.download(path.resolve(__dirname, 'public', 'index.html'));
});
app.listen(port, () => {
  console.log('Example app listening on port 3003!');
});
