const http = require('http');

//Բրաուզերում բացելուց հետո․․․
const server = http.createServer((req, res) => {
  console.log('Начало обработки запроса');
  res.writeHead(200, {'Content-Type': 'text/plain; charset=UTF-8'});
  res.end('Hello world!');
});

// start
server.listen(3000,  () => {
  console.log('Сервер запущен');
});




/*console.log("Start");

setTimeout(() => {
	console.log("Callback");
},2000);
setTimeout(() => {
	console.log("Callback2");
}, 0);
console.log("finish");*/