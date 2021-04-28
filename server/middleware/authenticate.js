const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.verify(token, 'verySecret');

    req.user = decode;
    next();
  } catch (err) {
    res.status(405).json({
      message: 'Authentication failed!',
    });
  }
};

module.exports = authenticate;
