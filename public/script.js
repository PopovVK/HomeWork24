// public/script.js
const socket = io();

document.addEventListener('DOMContentLoaded', () => {
  const username = prompt('Enter your name:');
  socket.emit('join', username);

  const chatMessages = document.getElementById('chat-messages');
  const messageInput = document.getElementById('message-input');
  const sendButton = document.getElementById('send-button');

  sendButton.addEventListener('click', () => {
    const message = messageInput.value.trim();
    if (message) {
      socket.emit('message', message);
      messageInput.value = '';
    }
  });

  socket.on('message', (message) => {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
  });
});
