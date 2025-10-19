const io = require('socket.io')(3000);

const users = {};

io.on('connection', (socket) => {
  socket.on('new-user', (name = 'anonymous') => {
    users[socket.id] = name;
    socket.broadcast.emit('user-connected', name);
  });

  socket.on('send-chat-message', (message) => {
    const data = {
      message,
      name: users[socket.id],
      date: new Date().toLocaleTimeString(),
    };

    socket.broadcast.emit('chat-message', data);
  });

  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id]);
    delete users[socket.id];
  });
});
