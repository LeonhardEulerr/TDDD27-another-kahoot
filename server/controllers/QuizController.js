const Question = require('../models/Question');
const Quiz = require('../models/Quiz');
const ObjectId = require('mongoose').Types.ObjectId;

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
    .then((q) => {
      res.status(200).json({
        id: q._id,
        message: 'Question added successfully!',
      });
    })
    .catch((_error) => {
      res.status(400).json({
        message: 'An error occured!',
      });
    });
};

const updateQuestion = (req, res, _next) => {
  let question = {
    title: req.body.title,
    answerA: req.body.answerA,
    correctA: req.body.correctA,
    answerB: req.body.answerB,
    correctB: req.body.correctB,
    answerC: req.body.answerC,
    correctC: req.body.correctC,
    answerD: req.body.answerD,
    correctD: req.body.correctD,
  };

  Question.findOneAndUpdate({ _id: req.params.id }, question, {
    new: true,
  })
    .exec()
    .then((q) => {
      if (q) {
        res.status(200).json({
          id: q._id,
          message: 'Question added successfully!',
        });
      } else {
        res.status(400).json({
          message: 'An error occured!',
        });
      }
    })
    .catch((_error) => {
      res.status(400).json({
        message: 'An error occured!',
      });
    });
};

const saveQuiz = (req, res, _next) => {
  let quiz = new Quiz({
    user: req.user.login,
    name: req.body.name,
    questions: req.body.ids,
  });

  quiz
    .save()
    .then((quiz) => {
      //console.log(quiz);
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

const updateQuiz = (req, res, next) => {
  let quiz = {
    user: req.user.login,
    name: req.body.name,
    questions: req.body.ids,
  };

  Quiz.findOneAndUpdate({ _id: req.params.id }, quiz, { new: true })
    .exec()
    .then((quiz) => {
      if (quiz) {
        res.status(200).json({
          id: quiz._id,
          message: 'Quiz added successfully!',
        });
      } else {
        res.status(400).json({
          message: 'An error occured!',
        });
      }
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
      res.status(200).json(quiz);
    });
};

const getQuizes = (req, res, _next) => {
  Quiz.find({ user: req.user.login })
    .populate('questions')
    .exec()
    .then((quizes) => {
      if (quizes) {
        res
          .status(200)
          .json({ message: 'Quizes fetched successfully.', quizes });
      } else {
        res.status(400).json({ message: 'Quizes coudnt be fecthed.' });
      }
    });
};

const deleteQuiz = (req, res, _next) => {
  const quizId = req.body.quizId;
  Quiz.findOneAndDelete({ _id: quizId }, (err, quiz) => {
    if (err) {
      console.log('error', err);
      return;
    } else {
      res.status(200).json({ message: 'Quiz deleted successfully', quiz });
      // remove all the quiestions as well
      // could use pre('remove') but questions have no relation to quiz
      for (const id of quiz.questions) {
        Question.findOneAndDelete({ _id: id }).exec();
      }
    }
  });
};

module.exports = {
  saveQuestion,
  saveQuiz,
  getQuiz,
  getQuizes,
  deleteQuiz,
  updateQuestion,
  updateQuiz,
};
