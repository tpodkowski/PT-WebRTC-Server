const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

let history = [];

io.on('connection', (socket) => {
  io.emit('chat:message', history);

  socket.on('chat:message', (msg) => {
    history.push({
      message: msg,
      date: new Date()
    });
    history = history.splice(-100);

    io.emit('chat:message', history);
  });
});

http.listen(port, () => {
  console.log('listening on *:' + port);
})
