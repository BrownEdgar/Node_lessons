const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.post('/', (req, res) => {
  res.send('Got a POST request');
});

app.get('/example/a', (req, res) => {
  res.send('Hello from A!');
});

app.get(
  '/example/b',
  (req, res, next) => {
    console.log('the response will be sent by the next function ...');
    next();
  },
  (req, res) => {
    res.send('Hello from B!');
  }
);

/* -------------------2----------------------*/
/* հետադարձ կանչի Ֆունկցիաների զանգվածը կարող է սպասարկել մեկ ուղի. օրինակ:
այստեղ consol-um կտպի CB0 հետո CB1 նոր body-ում կտպի ՝Hello from C!՝ */
const cb0 = function (req, res, next) {
  console.log('CB0');
  next();
};

const cb1 = function (req, res, next) {
  console.log('CB1');
  if (7 < 5) {
    res.end('stop');
  }
  next();
};

const cb2 = function (req, res) {
  res.end('Hello from C!');
};

app.get('/example/c', [cb0, cb1, cb2]);
/* -------------------3----------------------*/
/* Postman-ով  GET PUT կամ POST ընտրության դեպքում կարտածի համապատասխան տարբերակները */
app
  .route('/book')
  .get((req, res) => {
    res.send('Get a random book');
  })
  .post((req, res) => {
    res.status(201).send('Add a book');
  })
  .put((req, res) => {
    res.send('Update the book');
  });

app.listen(3003, () => {
  console.log('Example app listening on port 3003!');
});

/* Метод           Описание
res.download()    Приглашение загрузки файла.
res.end()         Завершение процесса ответа.
res.json()        Отправка ответа JSON.
res.jsonp()       Отправка ответа JSON с поддержкой JSONP.
res.redirect()    Перенаправление ответа.
res.render()      Вывод шаблона представления.
res.send()        Отправка ответа различных типов.
res.sendFile      Отправка файла в виде потока октетов.
res.sendStatus()  Установка кода состояния ответа и отправка представления в виде строки в качестве тела ответа. */
