import express from 'express';
import http from 'http';
import WebSocket from 'ws';

const app = express();
const server = http.createServer(app);
app.use(express.static('public'))

const wss = new WebSocket.Server({
  server
});

wss.on('connection', (ws) => {
  ws.on('message', (message) => {

    console.log('received: %s', message);
    ws.send(`Hello, you sent -> ${message}`);
  });

  ws.send('Hi there, I am a WebSocket server');
});

server.listen(3000, () => {
  console.log(`Server started on port ${server.address().port} :)`);
});