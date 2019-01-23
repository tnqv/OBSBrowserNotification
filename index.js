const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const axios = require("axios");
const port = process.env.PORT || 4001;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

server.listen(port, () => {
  console.log('Server listening at port %d', port);
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/donation-screen', function(req, res){
  res.sendFile(__dirname + '/donation-screen.html');
});

io.on('connection', (socket) => {
  // when the client emits 'new message', this listens and executes
  socket.on('donate',(msg)=> {
      socket.broadcast.emit('donate','Receive donate');
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});