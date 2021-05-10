const express = require('express');
const router = express.Router();

const QuizController = require('../controllers/QuizController');
const authenticate = require('../middleware/authenticate');

router.put('/question/:id', authenticate, QuizController.updateQuestion);
router.post('/question', authenticate, QuizController.saveQuestion);
router.post('/quiz', authenticate, QuizController.saveQuiz);
router.put('/quiz/:id', authenticate, QuizController.updateQuiz);
router.get('/quiz', authenticate, QuizController.getQuiz);
router.get('/quizes', authenticate, QuizController.getQuizes);
router.delete('/quizes', authenticate, QuizController.deleteQuiz);
router.post('/startQuiz', authenticate, QuizController.registerStartedQuiz);
router.get('/joinQuiz/:pin', QuizController.joinQuiz);

module.exports = router;
