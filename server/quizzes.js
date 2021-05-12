const quizzes = [];

const addQuiz = ({ pin, quiz }) => {
  const quizExists = quizzes.find((q) => q.pin === pin && q.quiz === quiz);

  if (quizExists) {
    return { error: 'Quiz has already started' };
  }

  const newQuiz = { pin, quiz, questionIndex: 0, scoreboard: [], answers: [] };
  quizzes.push(newQuiz);
  return { newQuiz };
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

const removeQuiz = (pin) => {
  const index = quizzes.findIndex((quiz) => quiz.pin === pin);

  if (index !== -1) {
    return quizzes.splice(index, 1)[0];
  }
};

module.exports = {
  addQuiz,
  removeQuiz,
  getNextQuestion,
};
