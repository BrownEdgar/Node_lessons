const socket = io('http://localhost:3000');
const messageContainer = document.getElementById('message-container');
const messageForm = document.getElementById('send-container');
const messageInput = document.getElementById('message-input');

const username = prompt('What is your name?', 'Edgar');
appendMessage('You joined');
socket.emit('new-user', username);

socket.on('chat-message', (data) => {
  appendMessage(`
    <div class="message">
      <p class="meta">${data.name} <span>${data.date}</span></p>
      <p class="text">${data.message}</p>
    </div>
  `);
});
// երբ "user"-ը մուտք է անում իր անունը գրելուց հետո, աշխատում է այս ֆունկցիան
// ԱՌԱՋԻՆ ԱՐԳՈՒՄԵՆՏՆԵՐԸ ՀԱՏՈՒԿ "EVENT"-Ր ԵՆ! Նշանակված "./server.js"-ից
socket.on('user-connected', (name = 'anonymous') => {
  appendMessage(`${name}-ը Միացավ մեզ`);
});

// "user"-ի դուր գալուց հետո այս մեկը
socket.on('user-disconnected', (name) => {
  appendMessage(`${name} disconnected`);
});

// "send"-ի ժամանակ
messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = messageInput.value;
  appendMessage(`<b>You:</b> ${message}`);
  socket.emit('send-chat-message', message);
  messageInput.value = '';
});

// Ամեն մի "message"-ի համար սարքում ենք նոր "div" մեջը տեղադրելով մեր "message"-ը
function appendMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.classList.add('box');
  messageElement.innerHTML = message;
  messageContainer.append(messageElement);
}
