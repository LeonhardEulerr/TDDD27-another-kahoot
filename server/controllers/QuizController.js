const Question = require('../models/Question');
const Quiz = require('../models/Quiz');

const saveQuestion = (req, res, _next) => {
  let question = new Question({
    title: req.body.title,
    answerA: req.body.answerA,
    correctA: req.body.correctA,
    answerB: req.body.answerB,
    correctB: req.body.correctB,
    answerC: req.body.answerC,
    correctC: req.body.correctC,
    answerD: req.body.answerD,
    correctD: req.body.correctD,
  });

  question
    .save()
    .then((question) => {
      res.status(200).json({
        id: question._id,
        message: 'Question added successfully!',
      });
    })
    .catch((_error) => {
      res.status(400).json({
        message: 'An error occured!',
      });
    });
};

const saveQuiz = (req, res, _next) => {
  let quiz = new Quiz({
    user: req.user._id,
    name: req.body.name,
    questions: req.body.ids,
  });

  quiz
    .save()
    .then((quiz) => {
      res.status(200).json({
        id: quiz._id,
        message: 'Quiz added successfully!',
      });
    })
    .catch((_error) => {
      res.status(400).json({
        message: 'An error occured!',
      });
    });
};

const getQuiz = (req, res, _next) => {
  Quiz.findOne({ _id: req.query.id })
    .populate('questions')
    .exec((err, quiz) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log('QUIZ', quiz);
      res.status(200).json(quiz);
    });
};

module.exports = {
  saveQuestion,
  saveQuiz,
  getQuiz,
};
