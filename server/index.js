const express = require("express");
const app = express();
const PORT = process.env.PORT || 4001;

let buttonState = false;

//šš» New imports
const http = require("http").Server(app);

const socketIO = require('socket.io')(http, { cors: { origin: '*' } });

app.use(express.static('src/ui'));

//šš» Add this before the app.get() block
socketIO.on('connection', (socket) => {
  console.log(`New Connection\nā”: ${socket.id} user just connected!`);

  socketIO.to(socket.id).emit('state', buttonState);

  socket.on('disconnect', () => {
    socket.disconnect()
    console.log(`š„: ${socket.id} disconnected`);
  });

  socket.on('changeState', value => {
    console.log(`š: ${socket.id}:`, value);
    buttonState = value;
    socket.broadcast.emit('state', value);
  });

});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});