const socketio = require('socket.io');
const http = require('http');

const {
  addUser,
  removeUser,
  getUser,
  getUserByNameAndPin,
  getUsersInQuiz,
} = require('./users');

const {
  addQuiz,
  addUserToQuiz,
  getUserScore,
  removeQuiz,
  getNextQuestion,
  getNextQuestionHost,
  setQuizQuestionIndex,
} = require('./quizzes');

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
      addUserToQuiz(pin, name);

      // let host know about new user
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

    socket.on('loadNextQuestionView', ({ pin, indexQuestion }, callback) => {
      //console.log(io.sockets.adapter.rooms.get(pin));
      setQuizQuestionIndex(pin, indexQuestion);
      socket.broadcast.to(pin).emit('loadNextQuestionView', {});
      callback({ success: true });
    });

    socket.on('getNextQuestionHost', ({ pin }, callback) => {
      const question = getNextQuestionHost(pin);
      if (question) {
        callback({ question });
      } else {
        callback({ error: 'Question could not be fetched' });
      }
    });

    socket.on('getNextQuestion', ({ pin }, callback) => {
      const question = getNextQuestion(pin);
      const user = getUser(socket.id);
      const { score, error } = getUserScore(pin, user.name);
      console.log(score);
      if (question && user && score !== undefined) {
        callback({ question, name: user.name, score: score });
      }

      callback({ error: 'Question or user could not be fetched' });
    });

    socket.on(
      'submitAnswer',
      ({ pin, answerA, answerB, answerC, answerD }, callback) => {
        console.log(answerA, answerB, answerC, answerD);
        // submiot answer to quiz answers object
        callback();
      }
    );

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
