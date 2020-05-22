const http = require('http'); 
const port = 8080;

const server = http.createServer((req, res) => { 
	res.end('Hello');
});
server.listen(port, () => {
console.log('Server listening on: http://localhost:%s', port);
});













/*Запустите сценарий командой cli.js yourName; вы увидите сообщение Hello yourName*/
const [nodePath, scriptPath, name] = process.argv; 
console.log('Hello', name);
