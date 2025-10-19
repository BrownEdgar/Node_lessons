# ChatCord App

Realtime chat app with websockets using Node.js, Express and Socket.io with Vanilla JS on the frontend with a custom UI

## Usage

```
npm install
npm run dev

Go to localhost:3000
```

## Notes

The _\_html_css_ folder is just a starter template to follow along with the tutorial at <https://www.youtube.com/watch?v=jD7FnbI76Hg&t=1339s>. It is not part of the app

## socket.broadcast.to()

Вариант 1: socket.broadcast.to().emit() Տվյալները կուղարկի բոլոր միացված socket-ին, բացառությամբ այն դեպքի, որն ի սկզբանե ուղարկել է հաղորդագրությունը / իրադարձությունը

## io.to()

Вариант 2: io.to().emit() - Տվյալները կուղարկի բոլոր միացված socket-ին, նաև նրան ով ի սկզբանե ուղարկել է հաղորդագրությունը / իրադարձությունը
