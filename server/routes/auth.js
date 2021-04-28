const express = require('express');
const router = express.Router();

const AuthController = require('../controllers/AuthController');
const authenticate = require('../middleware/authenticate');

router.get('/validate', authenticate, AuthController.validate);
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);

module.exports = router;
