const express = require('express')
const app = express();// darnum e mer servery
const route = express.Router();
const port = 3000;

/*
'/ab?cd' - acd и abcd.
'/ab+cd' - abcd, abbcd, abbbcd и т.д.
'/ab*cd' - abcd, abxcd, abRABDOMcd, ab123cd и т.д.
'/ab(cd)?e' -  /abe и /abcde.
/a/ -  любой элемент с “a” в имени маршрута.
/.*fly$/ - fly verjavorutyun
*/


app.route('/book')
  .get(function(req, res) {
    res.send('Get a random book');
  })
  .post(function(req, res) {
    res.send('Add a book');
  })
  .put(function(req, res) {
    res.send('Update the book');
  });

var requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};

app.use(requestTime);

app.get('/', function (req, res) {
  var responseText = 'Hello World!';
  responseText += 'Requested at: ' + req.requestTime + '';
  res.send(responseText);
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`))