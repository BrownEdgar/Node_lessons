const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

// URL- ից ստանում ենք օգտվողի անունը և սենյակը
const x = new URLSearchParams(location.search);
const username = x.get('username');
const room = x.get('room');

const socket = io();

// Join chatroom
socket.emit('joinRoom', { username, room });

// ստանում ենք "room"-ը և "user"-ին
socket.on('roomUsers', ({ room, users }) => {
  outputRoomName(room);
  outputUsers(users);
});

// սերվերից եկած "Message"-ը "մշակում" նեք
socket.on('message', (message) => {
  outputMessage(message);

  // Scroll down
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Ստանւոմ ենք հաղորդագրության տեքստը
  const msg = e.target.elements.msg.value;

  // Հաղորդագրության փոխանցում սերվերին
  socket.emit('chatMessage', msg);

  // Clear input
  e.target.elements.msg.value = '';
  e.target.elements.msg.focus();
});

// հաղորդագրություն նկարում ենք DOM- ում <div > p>-ի մեջ դնելով
function outputMessage(message) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `
  <p class="meta">${message.username} <span>${message.time}</span></p>
  <p class="text">
    ${message.text}
  </p>`;
  document.querySelector('.chat-messages').append(div);
}

// DOM-ում  ավելացնում ենք նաև  "room"-ի անվանումը
function outputRoomName(room) {
  roomName.innerText = room;
}

// ավելացնում ենք "user"-ին
function outputUsers(users) {
  userList.innerHTML = `
    ${users.map((user) => `<li>${user.username}</li>`).join('')}
  `;
}
