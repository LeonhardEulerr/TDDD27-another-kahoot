const quizzes = [];

const addQuiz = ({ pin, quiz }) => {
  const quizExists = quizzes.find((q) => q.pin === pin && q.quiz === quiz);

  if (quizExists) {
    return { error: 'Quiz has already started' };
  }

  const newQuiz = {
    pin,
    quiz,
    questionIndex: 0,
    scoreboard: [],
    answers: [],
    questionTimeout: false,
  };
  quizzes.push(newQuiz);
  return { newQuiz };
};

const addUserToQuiz = (pin, name) => {
  const quiz = quizzes.find((q) => q.pin === pin);
  if (quiz) {
    let user = {
      name,
      score: 0,
    };
    quiz.scoreboard.push(user);
  }
};

const getUserScore = (pin, name) => {
  const quiz = quizzes.find((q) => q.pin === pin);
  if (quiz) {
    const user = quiz.scoreboard.find((u) => u.name === name);
    if (user) {
      return { score: user.score };
    }
  }
  return { error: 'Score could not be fetched' };
};

const setQuizQuestionIndex = (pin, i) => {
  const index = quizzes.findIndex((quiz) => quiz.pin === pin);
  quizzes[index].questionIndex = i;
};

const getNextQuestion = (pin) => {
  const quiz = quizzes.find((quiz) => quiz.pin === pin);
  const i = quiz.questionIndex;
  const question = {
    answerA: quiz.quiz.questions[i].answerA,
    answerB: quiz.quiz.questions[i].answerB,
    answerC: quiz.quiz.questions[i].answerC,
    answerD: quiz.quiz.questions[i].answerD,
  };

  return question;
};

const getNextQuestionHost = (pin) => {
  const quiz = quizzes.find((quiz) => quiz.pin === pin);
  const i = quiz.questionIndex;
  return quiz.quiz.questions[i];
};

const removeQuiz = (pin) => {
  const index = quizzes.findIndex((quiz) => quiz.pin === pin);

  if (index !== -1) {
    return quizzes.splice(index, 1)[0];
  }
};

const setQuestionTimeout = (pin) => {
  const quiz = quizzes.find((quiz) => quiz.pin === pin);
  if (quiz) {
    quiz.questionTimeout = true;
  }
};

const isQuestionTimedOut = (pin) => {
  return;
};

const isAnswerCorrect = (pin, userAnswer) => {
  const quiz = quizzes.find((quiz) => quiz.pin === pin);
  if (quiz) {
    if (quiz.questionTimeout) {
      return { answer: 'timeout' };
    }

    const i = quiz.questionIndex;
    const { correctA, correctB, correctC, correctD } = quiz.quiz.questions[i];
    const { answerA, answerB, answerC, answerD } = userAnswer;

    if (
      answerA === correctA &&
      answerB === correctB &&
      answerC === correctC &&
      answerD === correctD
    ) {
      return { answer: 'correct' };
    }
  }

  return { answer: 'wrong' };
};

const addUserAnswer = ({
  pin,
  socketid,
  name,
  answerA,
  answerB,
  answerC,
  answerD,
}) => {
  const quiz = quizzes.find((quiz) => quiz.pin === pin);
  if (!quiz) {
    return { error: 'Answer could not be added' };
  }
  const { answer } = isAnswerCorrect(pin, {
    answerA,
    answerB,
    answerC,
    answerD,
  });

  const result = {
    socketid,
    name,
    answer,
  };
  quiz.answers.push(result);
  console.log(quiz.answers);

  return { success: 'Answer added' };
};

const getUsersAnswer = (socketid, pin) => {
  const quiz = quizzes.find((quiz) => quiz.pin === pin);
  if (quiz) {
    const index = quiz.answers.findIndex(
      (answer) => answer.socketid === socketid
    );
    if (index !== -1) {
      return { answer: quiz.answers[index].answer };
    } else {
      return { answer: 'timeout' };
    }
  }
};

const addAnswerToScoreboard = (name, pin, answer) => {
  const quiz = quizzes.find((quiz) => quiz.pin === pin);
  if (quiz) {
    const userIndex = quiz.scoreboard.findIndex((user) => user.name === name);
    if (userIndex !== -1 && answer === 'correct') {
      quiz.scoreboard[userIndex].score += 1;
    }
  }
};

const getScoreboard = (pin) => {
  const quiz = quizzes.find((quiz) => quiz.pin === pin);
  if (quiz) {
    return { scoreboard: quiz.scoreboard };
  }

  return { error: 'Could not fetch the scoreboard' };
};

const removeAllAnswers = (pin) => {
  const quiz = quizzes.find((quiz) => quiz.pin === pin);
  if (quiz) {
    quiz.answers = [];
  }
};

module.exports = {
  addQuiz,
  removeQuiz,
  getNextQuestion,
  getNextQuestionHost,
  setQuizQuestionIndex,
  addUserToQuiz,
  getUserScore,
  addUserAnswer,
  setQuestionTimeout,
  getUsersAnswer,
  addAnswerToScoreboard,
  getScoreboard,
};
