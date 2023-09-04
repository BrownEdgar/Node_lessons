

import express from 'express'
const app = express();
app.get('/', function (req, res) {
  const responseText = 'Hello World!';
  responseText += 'Requested at: ' + req.requestTime + '';
  res.send(responseText);
})

app.listen(3000, () => console.log(`Example app listening on port ${3000}!`))