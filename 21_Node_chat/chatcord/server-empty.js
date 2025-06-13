const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')
const formatMessage = require('./utils/messages')
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

app.use(express.static(path.join(__dirname, 'public')))

const botName = 'ChatCord Bot'

io.on('connection', (socket) => {
  // Այստեղ հետևում ենք չատի "message"-րին
  socket.on('chatMessage', (msg) => {})

  //Աշխատում է "client"-ի դուս գալու ժամանակ
  socket.on('disconnect', () => {})
})

const PORT = process.env.PORT || 3000

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))
