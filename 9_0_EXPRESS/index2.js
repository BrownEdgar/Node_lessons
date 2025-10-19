const express = require('express');

const app = express();

const requestTime = function (req, res, next) {
  req.requestTime = Date.now();
  next();
};

app.use(requestTime);

app.get('/', (req, res) => {
  const responseText = 'Hello World!';
  responseText += ` Requested at: ${new Date()}`;
  res.send(responseText);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message,
    },
  });
});

app.listen(3000, () => console.log('server is starting'));
/* Если запрос адресован корневому каталогу приложения, приложение выводит на экран системное время запроса в браузере. */
