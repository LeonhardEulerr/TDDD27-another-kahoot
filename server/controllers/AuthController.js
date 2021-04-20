const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
        res.json({
          message: 'User added successfully!',
        });
      })
      .catch((error) => {
        res.json({
          message: 'An error occured!',
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
            expiresIn: '1h',
          });
          res.json({
            message: 'Login successful!',
            token,
          });
        } else {
          res.json({
            message: 'Password does not match',
          });
        }
      });
    } else {
      res.json({
        message: 'Nop user found!',
      });
    }
  });
};

module.exports = {
  register,
  login,
};
