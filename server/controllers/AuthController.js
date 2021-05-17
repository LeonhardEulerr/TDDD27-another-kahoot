const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const validate = (req, res, next) => {
  // middleware will not come here if user wasnt authenticated
  User.findOne({ login: req.user.login }).then((user) => {
    if (user) {
      res.status(200).json({
        user,
      });
    } else {
      res.status(400).json({
        message: 'Nop user found!',
      });
    }
  });
};

const register = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, function (err, hashedPass) {
    if (err) {
      res.json({
        error: err,
      });
    }

    let user = new User({
      login: req.body.login,
      password: hashedPass,
      email: req.body.email,
    });

    user
      .save()
      .then((user) => {
        let token = jwt.sign({ login: user.login }, 'verySecret', {
          expiresIn: '8h',
        });
        res.status(200).json({
          message: 'User added successfully!',
          token,
        });
      })
      .catch((_error) => {
        res.status(400).json({
          message: 'User already exists',
        });
      });
  });
};

const login = (req, res, next) => {
  var login = req.body.login;
  var password = req.body.password;

  User.findOne({ login: login }).then((user) => {
    if (user) {
      bcrypt.compare(password, user.password, function (err, result) {
        if (err) {
          res.json({
            error: err,
          });
        }
        if (result) {
          let token = jwt.sign({ login: user.login }, 'verySecret', {
            expiresIn: '8h',
          });
          res.status(200).json({
            message: 'Login successful!',
            token,
          });
        } else {
          res.status(400).json({
            message: 'Password does not match',
          });
        }
      });
    } else {
      res.status(400).json({
        message: 'No user found!',
      });
    }
  });
};

module.exports = {
  register,
  login,
  validate,
};
