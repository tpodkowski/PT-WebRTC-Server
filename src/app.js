const express = require('express');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

let history = [];

io.on('connection', (socket) => {
  history = [];

  io.emit('chat:message', history);

  socket.on('chat:message', (msg) => {
    history.push({
      message: msg,
      date: new Date()
    });
    history = history.splice(-100);

    io.emit('chat:message', history);
  });

  socket.on('chat:typing', (data) => {
    io.emit('chat:typing', data);
  });
});

// io.on('connection', (socket) => {
//   socket.on('video:sending', (data) => {
//     socket.emit('video:sending', data);
//   });
// });

http.listen(port, 'localhost', () => {
  console.log('listening on *:' + port);
})
