// app.js
const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('join', (username) => {
    socket.username = username;
    io.emit('message', `${username} has joined the chat`);
  });

  socket.on('message', (message) => {
    io.emit('message', `${socket.username}: ${message}`);
  });

  socket.on('disconnect', () => {
    io.emit('message', `${socket.username} has left the chat`);
  });
});

const port = process.env.PORT || 3000;
http.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
