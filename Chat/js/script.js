/* eslint-disable no-undef */
const socket = io();

const form = document.getElementById('form');
const input = document.getElementById('input');
console.log(111);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  if (input.value) {
    // uxarkum e SMS-y back end
    socket.emit('chat message', input.value);
    input.value = '';
  }
});
