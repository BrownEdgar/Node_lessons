const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const formatMessage = require('./utils/messages');
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers
} = require('./utils/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);


app.use(express.static(path.join(__dirname, 'public')));

const botName = 'ChatCord Bot';

// Աշխատում է, երբ "user"-ը  միանում է
io.on('connection', socket => {
  socket.on('joinRoom', ({ username, room }) => {
		//պահում ենք user-ին զանգվածի մեջ 
    const user = userJoin(socket.id, username, room);

    socket.join(user.room);

    // Welcome "message"-ի ուղարկում սենյակ մտնելոց հետո
    socket.emit('message', formatMessage(botName, 'Welcome to ChatCord!'));

    // broadcast նշ․է Հաղորդագրության ուղարկում բոլորին բացի այն "socket"-ից, որն իրեն աշխատացնում է
    socket.broadcast
      .to(user.room)
      .emit(
        'message',
        formatMessage(botName, `${user.username} has joined the chat`)
      );

	// Ուղարկում ենք օգտվողներին և սենյակի տվյալները
	//getRoomUsers ֆունկցիան գտնում է այդ սենյակի բոլոր օգտվողներին 
    io.to(user.room).emit('roomUsers', {
      room: user.room,
      users: getRoomUsers(user.room)
    });
  });

  // Այստեղ հետևում ենք չատի "message"-րին
  socket.on('chatMessage', msg => {
    const user = getCurrentUser(socket.id);

    io.to(user.room).emit('message', formatMessage(user.username, msg));
  });

  //Աշխատում է "client"-ի դուս գալու ժամանակ
  socket.on('disconnect', () => {
    const user = userLeave(socket.id);

    if (user) {
      io.to(user.room).emit(
        'message',
        formatMessage(botName, `${user.username} has left the chat`)
      );

      //Ուղարկում ենք օգտվողներին և սենյակի տվյալները
      io.to(user.room).emit('roomUsers', {
        room: user.room,
        users: getRoomUsers(user.room)
      });
    }
  });
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
