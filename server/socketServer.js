const socketio = require('socket.io');
const http = require('http');

module.exports.server = function (app) {
  const server = http.createServer(app);
  const io = socketio(server);

  io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('lala', ({ lala }, callback) => {
      console.log(lala);
      socket.emit('message', { message: 'answer from the server' });
      //callback();
    });

    socket.on('message', ({ message }, _callback) => {
      console.log(message);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });
  return server;
};
