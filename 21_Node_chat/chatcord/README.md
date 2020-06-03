# ChatCord App
Realtime chat app with websockets using Node.js, Express and Socket.io with Vanilla JS on the frontend with a custom UI

## Usage
```
npm install
npm run dev

Go to localhost:3000
```

## Notes
The *_html_css* folder is just a starter template to follow along with the tutorial at https://www.youtube.com/watch?v=jD7FnbI76Hg&t=1339s. It is not part of the app

## socket.broadcast.to()
Вариант 1: socket.broadcast.to().emit()отправит данные во все подключенные сокеты, кроме того, который изначально отправил событие
##  io.to()
Вариант 2: io.to().emit()отправит данные на все подключенные сокеты, включая тот, который изначально отправил событие
