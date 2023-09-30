io.on('connect', onConnect);

function onConnect(socket){

  ### отправка клиенту
  socket.emit('hello', 'can you hear me?', 1, 2, 'abc');

  ### отправка всем клиентам, кроме отправителя
  socket.broadcast.emit('broadcast', 'hello friends!');

  ### отправка всем клиентам комнаты 'game', кроме отправителя
  socket.to('game').emit('nice game', "let's play a game");

  ### отправка всем клиентам комнат 'game1' и/или 'game2' , кроме отправителя
  socket.to('game1').to('game2').emit('nice game', "let's play a game (too)");

  ### отправка всем клиентам комнаты 'game' , включая отправителя
  io.in('game').emit('big-announcement', 'the game will start soon');

  ### отправка всем клиентам пространства имен 'myNamespace', включая отправителя
  io.of('myNamespace').emit('bigger-announcement', 'the tournament will start soon');

  ### отправка в определенную комнату в определенном пространстве имен, включая отправителя
  io.of('myNamespace').to('room').emit('event', 'message');

  ### отправка на индивидуальный socketid (личное сообщение)
  io.to(`${socketId}`).emit('hey', 'I just met you');

  ### ВНИМАНИЕ: `socket.to(socket.id).emit()` НЕ будет работать, как бы мы отправляли сообщение всем в комнату
  ### `socket.id`, а не отправителю. Вместо этого, используйте `socket.emit()`.

  ### отправка с подтверждением
  socket.emit('question', 'do you think so?', function (answer) {});

  ### отправка без сжатия
  socket.compress(false).emit('uncompressed', "that's rough");

  ### отправка сообщения, которое может быть отброшено, если клиент не готов к приему сообщений
  socket.volatile.emit('maybe', 'do you really need it?');

  ### указание, имеют ли данные для отправки двоичные данные
  socket.binary(false).emit('what', 'I have no binaries!');

  ### отправка всем клиентам на этом узле (при использовании нескольких узлов)
  io.local.emit('hi', 'my lovely babies');

  ### отправка всем подключенным клиентам
  io.emit('an event sent to all connected clients');

};