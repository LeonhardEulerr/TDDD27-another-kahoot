const socketio = require('socket.io');
const http = require('http');

const {
  addUser,
  removeUser,
  getUser,
  getUserByNameAndPin,
  getUsersInQuiz,
} = require('./users');

module.exports.server = function (app) {
  const server = http.createServer(app);
  const io = socketio(server);

  io.on('connection', (socket) => {
    console.log('New user connected', socket.id);

    socket.on('joinHost', ({ pin }, callback) => {
      const { error, user } = addUser({
        id: socket.id,
        name: 'host',
        pin: pin,
      });

      if (error) {
        return callback(error);
      }

      socket.join(user.pin);
      callback({ message: 'SUCCESS' });
    });

    socket.on('participantJoin', ({ pin, name }, callback) => {
      const { error, user } = addUser({
        id: socket.id,
        name,
        pin,
      });

      if (error) {
        return callback(error);
      }

      socket.join(user.pin);
      const host = getUserByNameAndPin('host', pin);
      io.to(host.id).emit('newUser', { name });
    });

    socket.on('message', ({ message }) => {
      console.log(message);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
      removeUser(socket.id);
    });
  });
  return server;
};
