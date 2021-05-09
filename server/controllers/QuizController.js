const Question = require('../models/Question');
const { Quiz, StartedQuiz } = require('../models/Quiz');
const ObjectId = require('mongoose').Types.ObjectId;

const MAX_PIN = 10000000;
const MIN_PIN = 100000;

const getPinCode = (cb) => {
  var pin = parseInt(Math.random() * (MAX_PIN - MIN_PIN) + MIN_PIN).toString();

  StartedQuiz.findOne({ pin }, function (err, docs) {
    if (!err && !docs) {
      cb(pin);
    } else {
      getPinCode(cb);
    }
  });
};

const registerStartedQuiz = (req, res, _next) => {
  getPinCode((pin) => {
    let startedQuiz = new StartedQuiz({
      quiz: req.body.id,
      pin,
    });

    startedQuiz
      .save()
      .then((quiz) => {
        res.status(200).json({
          quiz,
          message: 'Started quiz successfully',
        });
      })
      .catch((_err) => {
        res.status(400).json({
          message: 'Quiz not added',
        });
      });
  });
};

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
  registerStartedQuiz,
};
