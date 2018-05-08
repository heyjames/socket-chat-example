const express = require('express');
const http = require('http'); // HTTP server
const path = require('path'); 

const app = express(); // Initialize "app" to be a function handler to supply to an HTTP server.
const server = http.Server(app); // Initialize an HTTP server
const io = require('socket.io')(server); // Initialize instance of socket.io

app.get('/', (req, res) => { // Route handler
  res.sendFile(path.join(__dirname, './index.html')); // join path name to index.html and serve HTML file located in root dir.
});

// socket.io listeners. ".on" is a method from Node's EventEmitter class. AKA addListener().
// Listens for incoming sockets on the "connection" event.
io.on('connection', (socket) => {
  console.log('A user has connected.');
  
  socket.on('disconnect', () => {
    console.log('A user has disconnected.');
  });
  
  socket.on('chat message', (msg) => { // Receives "$('#m').val()" String from client as "msg" when client selects the "Send" button.
    console.log('message: ' + msg); // Log "msg" on the console.
    io.emit('chat message', msg); // Send "msg" back to the client.
  });
});

const port = process.env.PORT || 3000;
server.listen(3000, () => console.log(`Listening on port ${port}`));

