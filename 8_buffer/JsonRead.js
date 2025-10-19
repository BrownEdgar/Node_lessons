const http = require('http');

/* JSon read */
const server = http.createServer((req, res) => {
  console.log('Начало обработки запроса');
  res.writeHead(200, { 'Content-Type': 'application/json' });
  const myObj = {
    name: 'Sebastian',
    surname: 'Rodriges',
    age: 25,
    name23: 'Sebastian',
    surname2: 'Rodriges',
    age1: 25,
  };
  res.JSON();
  res.end(JSON.stringify(myObj));
});

server.listen(3000, () => {
  console.log('Сервер запущен');
});
