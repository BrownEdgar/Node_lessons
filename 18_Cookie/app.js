var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');

app.use(cookieParser());

app.get('/', function (req, res, next) {
  res.cookie('My first cookie', "Good job");
  res.cookie('token', Math.random().toString(16).slice(2, 32),
    {
      maxAge: 1000 * 60 * 60 * 24,
      secure: true,
      httpOnly: true,
    });
  res.cookie('My first cookie', "public cookie string ")
  res.cookie('My secret cookie', "secret word", { maxAge: 10000 })

  res.json({ cookies: req.cookies });
});
app.get('/removeCookie', function (req, res, next) {
  res.clearCookie('My first cookie');
  res.end("cookie are removed");
});
app.get('/readCookie', function (req, res, next) {
  // document.cookie բրաուզերում ցույց կտա միայն առաջին cookie-ն 
  const cookies = req.cookies;
  console.log(cookies);
  res.json({ cookies });
});

app.listen(5010, () => console.log("Server is running"));