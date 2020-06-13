const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io').listen(server);

const users = []
const connections = []


app.get('/', function (req, res) {
	res.sendFile(__dirname + "/index.html");//առանց "․"-ի
});


io.on('connection', (socket) => {
	//Ընդունում ենք ֆայլը ուղարկելով հետ
	socket.on('user image', function (msg) {
		io.emit('user image', socket.username, msg);
	});

	socket.on('user message', function (msg) {
		console.log('msg', msg)
	 });
	



	connections.push(socket);
	//ամեն մի "socket" ուն նաև "disconnect" իրադարձություն
	socket.on('disconnect', () => {
		console.log('user disconnected');
	});
	socket.on('chat message', (msg) => {
		io.emit('chat message', msg);
		console.log('message: ', msg);
		socket.broadcast.emit('chat-message', { message: msg })
	});
	
	socket.on('new user', (data,cb) => {
		cb(true);
		
		socket.username = data
		users.push(socket.username)
		updateUsernames();
		
	});
	function updateUsernames() {
		console.log(users);
		io.emit('get users', users);
	}
	
});



// ԿԱՐևՈՐ: app.listen(3000) այստեղ չի աշխատի!
server.listen(process.env.PORT || 3000)
console.log("server is runnning");