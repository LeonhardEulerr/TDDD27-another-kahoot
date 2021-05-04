const express = require('express');
const router = express.Router();

const QuizController = require('../controllers/QuizController');
const authenticate = require('../middleware/authenticate');

router.post('/question', authenticate, QuizController.saveQuestion);
router.post('/quiz', authenticate, QuizController.saveQuiz);
router.get('/quiz', authenticate, QuizController.getQuiz);

module.exports = router;
