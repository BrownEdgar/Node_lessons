var express = require('express');
const app = express();
var router = express.Router();
const port = 3000;


router.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});


router.use('/user/:id', function(req, res, next) {
  console.log('Request URL:', req.originalUrl);// user/id
  next();
}, function (req, res, next) {
  console.log('Request Type:', req.method); //GET
  next();
});


router.get('/user/:id', function (req, res, next) {
  if (req.params.id == 0) next('route');
}, function (req, res, next) {
  res.render('regular');
});


router.get('/user/:id', function (req, res, next) {
  console.log(req.params.id);
  res.render('special');
});


app.use('/', router);
app.listen(port, () => console.log(`Example app listening on port ${port}!`))