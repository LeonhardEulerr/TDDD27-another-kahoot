const socketio = require('socket.io');
const http = require('http');

const {
  addUser,
  removeUser,
  getUser,
  getUserByNameAndPin,
  getUsersInQuiz,
} = require('./users');

const { addQuiz, removeQuiz, getNextQuestion } = require('./quizzes');

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

    socket.on('joinParticipant', ({ pin, name }, callback) => {
      const { error, user } = addUser({
        id: socket.id,
        name,
        pin,
      });

      if (error) {
        return callback({ error });
      }

      socket.join(user.pin);
      const host = getUserByNameAndPin('host', pin);
      io.to(host.id).emit('newUser', { name });
      callback({ success: true });
    });

    socket.on('addQuiz', ({ pin, quiz }, callback) => {
      const { error } = addQuiz({ pin, quiz });

      if (error) {
        callback({ error: 'Quiz could not be started' });
      }

      callback({ success: true });
    });

    socket.on('loadNextQuestionView', ({ pin }, callback) => {
      socket.broadcast.to(pin).emit('loadNextQuestionView', {});
      callback({ success: true });
    });

    socket.on('getNextQuestion', ({ pin }, callback) => {
      const question = getNextQuestion(pin);
      const user = getUser(socket.id);
      if (question && user) {
        callback({ question, name: user.name });
      }

      callback({ error: 'Question or user could not be fethced' });
    });

    socket.on('message', ({ message }) => {
      console.log(message);
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
      const user = getUser(socket.id);

      if (user && user.name === 'host') {
        console.log('removing host');
        removeQuiz(user.pin);
      }

      // remove all the users from the started quiz and redirect them to start page
      removeUser(socket.id);
    });
  });
  return server;
};
