const socketio = require('socket.io');
const http = require('http');

const {
  addUser,
  removeUser,
  getUser,
  updateUserSocketId,
  getUserByNameAndPin,
  removeAllPlayersInQuiz,
} = require('./users');

const {
  addQuiz,
  addUserToQuiz,
  getUserScore,
  addUserAnswer,
  removeQuiz,
  getNextQuestion,
  getNextQuestionHost,
  setQuizQuestionIndex,
  setQuestionTimeout,
  getUsersAnswer,
  addAnswerToScoreboard,
  getScoreboard,
  removeAllAnswers,
  updateUserAnswerInQuiz,
} = require('./quizzes');

module.exports.server = function (app) {
  const server = http.createServer(app);
  const io = socketio(server);

  io.on('connection', (socket) => {
    console.log('New user connected', socket.id);

    socket.on('rejoin', ({ pin, name }, _callback) => {
      console.log('ID', socket.id);
      updateUserSocketId({ socketid: socket.id, pin, name });
      updateUserAnswerInQuiz({ socketid: socket.id, pin, name });
      socket.join(pin);
    });

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
      removeAllAnswers(pin);
      setQuestionTimeout(pin, false);
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

    socket.on('getNextQuestionParticipant', ({ pin }, callback) => {
      const question = getNextQuestion(pin);
      const user = getUser(socket.id);
      const { score, error } = getUserScore(pin, user ? user.name : null);

      if (question && user && score !== undefined) {
        callback({ question, name: user.name, score: score });
      }

      callback({ error: 'Question or user could not be fetched' });
    });

    socket.on(
      'submitAnswer',
      ({ pin, answerA, answerB, answerC, answerD }, callback) => {
        const user = getUser(socket.id);
        // submit answer to quiz answers object
        const answer = {
          pin,
          socketid: socket.id,
          name: user.name,
          answerA,
          answerB,
          answerC,
          answerD,
        };
        const { success, error } = addUserAnswer(answer);
        if (error) {
          return callback(error);
        }

        const userAnswer = getUsersAnswer(socket.id, pin);
        addAnswerToScoreboard(user.name, pin, userAnswer.answer);

        callback(success);
      }
    );

    socket.on('timeout', ({ pin }, callback) => {
      setQuestionTimeout(pin, true);
      socket.broadcast.to(pin).emit('timeout', {});
      callback({ success: 'Timeout successfully sent' });
    });

    socket.on('correctAnswer', ({ pin }, callback) => {
      const { error, answer } = getUsersAnswer(socket.id, pin);
      if (error) {
        return callback(error);
      }
      callback(answer);
    });

    socket.on('getQuestionStats', ({ pin }, callback) => {
      const { scoreboard, error } = getScoreboard(pin);
      if (error) {
        return callback({ error });
      }
      callback({ scoreboard });
    });

    socket.on('kickAll', () => {
      const user = getUser(socket.id);

      if (user && user.name === 'host') {
        removeQuiz(user.pin);
        socket.to(user.pin).emit('kick');

        removeAllPlayersInQuiz(user.pin);
        removeUser(user.id);
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected');
      const user = getUser(socket.id);

      if (user && user.name === 'host') {
        console.log('removing host');
        removeQuiz(user.pin);
        removeAllPlayersInQuiz(user.pin);
        removeUser(user.id);
        socket.to(user.pin).emit('kick');

        // const ids = io.sockets.adapter.rooms.get(user.pin);
        // if (ids) {
        //   ids.forEach((id) => {
        //     removeUser(id);
        //     io.sockets.sockets.get(id).disconnect();
        //   });
        // }
      }
    });
  });
  return server;
};
