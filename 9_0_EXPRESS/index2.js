const express = require('express');
const app = express();

const requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};

app.use(requestTime);

app.get('/', function (req, res) {
  const responseText = 'Hello World!';
  responseText += ' Requested at: ' + new Date() + '';
  res.send(responseText);
});


app.listen(3000, ()=>console.log("server is starting"));
/*Если запрос адресован корневому каталогу приложения, приложение выводит на экран системное время запроса в браузере.*/