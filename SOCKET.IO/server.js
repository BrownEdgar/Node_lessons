const http = require('http');
const path = require('path');

const express = require('express');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);

const io = new Server(server);

app.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});
io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });
});
// io.on('connection', (socket) => {
//   //Ընդունում ենք ֆայլը ուղարկելով հետ
//   socket.on('user image', function (msg) {
//     io.emit('user image', socket.username, msg)
//   })

//   socket.on('user message', function (msg) {
//     console.log('msg', msg)
//   })

//   connections.push(socket)
//   //ամեն մի "socket" ուն նաև "disconnect" իրադարձություն
//   socket.on('disconnect', () => {
//     console.log('user disconnected')
//   })
//   socket.on('chat message', (msg) => {
//     io.emit('chat message', msg)
//     console.log('message: ', msg)
//     socket.broadcast.emit('chat-message', { message: msg })
//   })

//   socket.on('new user', (data, cb) => {
//     cb(true)

//     socket.username = data
//     users.push(socket.username)
//     updateUsernames()
//   })
//   function updateUsernames() {
//     console.log(users)
//     io.emit('get users', users)
//   }
// })

// ԿԱՐևՈՐ: app.listen(3000) այստեղ չի աշխատի!
server.listen(process.env.PORT || 3000);
console.log('server is runnning');

// import express from 'express'
// import { createServer } from 'node:http'
// import { fileURLToPath } from 'node:url'
// import { dirname, join } from 'node:path'
// import { Server } from 'socket.io'

// const io = new Server(server)

// const app = express()
// const server = createServer(app)

// const __dirname = dirname(fileURLToPath(import.meta.url))

// app.get('/', (req, res) => {
//   res.sendFile(join(__dirname, './index.html'))
// })

// io.on('connection', (socket) => {
//   console.log('a user connected')
// })

// server.listen(4000, () => {
//   console.log('server running at http://localhost:4000')
// })
