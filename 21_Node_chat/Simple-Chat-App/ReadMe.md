# Աշխատացնել այս հասցեով, 3000 պորտի տակ չի բացի
http://127.0.0.1:5500/index.html կամ "Live Server"-ով


# Новый Socket.IO, обмен данными в реальном времени
# tutorial link => https://habr.com/ru/post/127525/


# https://socket.io/get-started/chat/


// отправить текущему сокету сформировавшему запрос (туда откуда пришла)
socket.emit('eventClient', "this is a test");

// отправить всем пользователям, включая отправителя
io.sockets.emit('eventClient', "this is a test");

// отправить всем, кроме отправителя
socket.broadcast.emit('eventClient', "this is a test");

// отправить всем клиентам в комнате (канале) 'game', кроме отправителя
socket.broadcast.to('game').emit('eventClient', 'nice game');

// отправить всем клиентам в комнате (канале) 'game', включая отправителя
io.sockets.in('game').emit('eventClient', 'cool game');

// отправить конкретному сокету, по socketid
io.sockets.socket(socketid).emit('eventClient', 'for your eyes only');