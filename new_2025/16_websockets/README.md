# WebSockets - Real-time Communication

Двусторонняя real-time коммуникация между клиентом и сервером.

## 🔌 WebSockets vs HTTP

| Feature       | WebSockets    | HTTP             |
| ------------- | ------------- | ---------------- |
| Communication | Bidirectional | Request-Response |
| Connection    | Persistent    | Stateless        |
| Latency       | Low (~1-2ms)  | Higher           |
| Use case      | Real-time     | CRUD operations  |

## 📦 Два подхода

### 1. Native WebSockets (`ws`)

```bash
npm install ws
```

**Плюсы:**

- Lightweight
- Стандарт W3C
- Полный контроль

**Минусы:**

- Нет автоматического reconnect
- Нет room support
- Больше boilerplate кода

### 2. Socket.IO

```bash
npm install socket.io
```

**Плюсы:**

- Auto-reconnect
- Rooms & namespaces
- Broadcasting
- Fallback к polling

**Минусы:**

- Больший размер
- Не чистый WebSocket protocol

## 🚀 Use Cases

### Real-time приложения

- **Chat** - мгновенные сообщения
- **Notifications** - уведомления в реальном времени
- **Live updates** - курсы валют, спортивные результаты
- **Collaborative editing** - Google Docs аналог
- **Gaming** - multiplayer игры
- **Dashboard** - live метрики
- **Live streaming** - comments, reactions

## 📝 Native WebSocket Example

### Server

```javascript
const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws, req) => {
  console.log('Client connected');

  ws.on('message', (message) => {
    console.log('Received:', message);

    // Broadcast to all clients
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
```

### Client

```javascript
const ws = new WebSocket('ws://localhost:8080');

ws.onopen = () => {
  console.log('Connected');
  ws.send('Hello Server!');
};

ws.onmessage = (event) => {
  console.log('Received:', event.data);
};

ws.onerror = (error) => {
  console.error('Error:', error);
};

ws.onclose = () => {
  console.log('Disconnected');
};
```

## 🎯 Socket.IO Example

### Server

```javascript
const io = require('socket.io')(server, {
  cors: { origin: '*' },
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  // Join room
  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    socket.to(roomId).emit('user-joined', socket.id);
  });

  // Chat message
  socket.on('chat-message', (data) => {
    io.to(data.room).emit('message', {
      user: socket.id,
      text: data.message,
      timestamp: new Date(),
    });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});
```

### Client

```javascript
const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('Connected:', socket.id);
  socket.emit('join-room', 'room1');
});

socket.on('message', (data) => {
  console.log('Message:', data);
});

socket.emit('chat-message', {
  room: 'room1',
  message: 'Hello!',
});
```

## 🔐 Authentication

### Token-based

```javascript
io.use((socket, next) => {
  const token = socket.handshake.auth.token;

  try {
    const user = verifyToken(token);
    socket.user = user;
    next();
  } catch (err) {
    next(new Error('Authentication error'));
  }
});
```

## 📊 Patterns

### 1. Broadcasting

```javascript
// To all clients
io.emit('event', data);

// To all except sender
socket.broadcast.emit('event', data);

// To specific room
io.to('room1').emit('event', data);

// To multiple rooms
io.to('room1').to('room2').emit('event', data);
```

### 2. Acknowledgments

```javascript
// Server
socket.on('message', (data, callback) => {
  console.log(data);
  callback({ status: 'received' });
});

// Client
socket.emit('message', 'Hello', (response) => {
  console.log(response.status);
});
```

### 3. Namespaces

```javascript
// Server
const adminNs = io.of('/admin');
adminNs.on('connection', (socket) => {
  console.log('Admin connected');
});

// Client
const adminSocket = io('http://localhost:3000/admin');
```

## ⚡ Performance Tips

1. **Connection pooling** - переиспользование соединений
2. **Message batching** - группировка сообщений
3. **Compression** - сжатие данных
4. **Binary data** - вместо JSON когда возможно
5. **Heartbeat** - проверка живости соединения
6. **Scaling** - Redis adapter для множества серверов

## 🔄 Scaling with Redis

```javascript
const { createAdapter } = require('@socket.io/redis-adapter');
const { createClient } = require('redis');

const pubClient = createClient({ host: 'localhost', port: 6379 });
const subClient = pubClient.duplicate();

io.adapter(createAdapter(pubClient, subClient));
```

## 🛡️ Security

- Validate all messages
- Rate limiting
- Authentication/Authorization
- CORS configuration
- Input sanitization
- DoS protection

## 📱 Client Reconnection

```javascript
const socket = io('http://localhost:3000', {
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
  reconnectionDelayMax: 5000,
});

socket.on('reconnect', (attemptNumber) => {
  console.log('Reconnected after', attemptNumber, 'attempts');
});
```
